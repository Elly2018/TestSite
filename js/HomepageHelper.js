/* Artwork object specific */
/* Object will represend artwork */
class Artwork{
    constructor(CoverFileName, Title){
        this.CoverFileName = CoverFileName;
        this.Title = Title;
    }
}

/* Member object specific */
/* Enginner can find all the profile information in this class */
class Profile{
    constructor(CoverFileName, PersonName, PersonInformation){
        this.CoverFileName = CoverFileName;
        this.PersonName = PersonName;
        this.PersonInformation = PersonInformation;
    }
}

/* The patterm that use for col-sm from bootstrap grid system */
class WorkRenderPatterm{
    constructor(patterm, animatePatterm){
        this.patterm = patterm.split(':');
        this.animatePatterm = animatePatterm.split(':');
    }
}

/* Initialize global variable */
/* For data store */
var ArtworkArray = [];
var ProfileArray = [];
var ArtworkPatterm = [];

var pageName = "";

// The script that response for the web page rendering
function RDonload(){
    /* RD stand for result design */
    RDVariableInitialize();
    RDCoverLoading();
    RDAnimationInitialize();
}

/* Variable initialization, add item from this function */
function RDVariableInitialize(){
    /* Get the html file name */
    var path = window.location.pathname;
    pageName = path.split("/").pop();

    /* Create artwork array data */
    ArtworkArray = [
        new Artwork("../media/image/TitleImage.jpg", "遊戲人生"),
        new Artwork("../media/image/TitleImage.jpg", "人生勝利組"),
        new Artwork("../media/image/TitleImage.jpg", "一帆風順"),
        new Artwork("../media/image/TitleImage.jpg", "見璃的人生"),
        new Artwork("../media/image/TitleImage.jpg", "測試元件")
    ];

    /* Create profile array data */
    ProfileArray = [
        new Profile("media/image/profile.png", "見璃", "遠古的神廟管理者"),
        new Profile("media/image/profile.png", "君昊", "史詩世紀中的傳說英雄"),
        new Profile("media/image/profile.png", "文杰", "上古時代的元素巨龍"),
        new Profile("media/image/profile.png", "昱安", "神"),
        new Profile("media/image/profile.png", "阿宏", "我好寂寞喔 我好寂寞喔")
    ];

    /* Create patterm that use for index webpage animation */
    ArtworkPatterm = [
        new WorkRenderPatterm("4:8", "flip-right:flip-left"),
        new WorkRenderPatterm("8:4", "flip-left:flip-right"),
        new WorkRenderPatterm("4:4:4", "fade-up:fade-up:fade-up"),
        new WorkRenderPatterm("4:8", "flip-right:flip-left"),
        new WorkRenderPatterm("8:4", "flip-left:flip-right"),
        new WorkRenderPatterm("4:8", "flip-right:flip-left"),
        new WorkRenderPatterm("12", "fade-up")
    ];
}

//#region Loading cover part
/* Loading work into webpage */
function RDCoverLoading(){
    /* Action depend on the name of the file */
    switch(pageName){
        /* Homepage loading */
        case "index.html":
            RDIndexCoverLoading();
            break;

        /* Work loading */
        case "work.html":
            RDWorkCoverLoading();
            break;
        /* About loading */
        case "about.html":
            RDAboutProfileLoading();
            break;
    }
}

/* Index page loading */
//#region Index
function RDIndexCoverLoading(){
    var parent = $("#showcase");

    /* The current cursor for array indexing */
    var Cursor = 0;

    /* Loop all patterm register */
    for(var i = 0; i < ArtworkPatterm.length; i++){
        /* Row buffer and sending artwork information array buffer */
        var ARow;
        var CanBeAdd = false;
        var ASendingBuffer = [];

        /* Loop the patterm */
        for(var j = 0; j < ArtworkPatterm[i].patterm.length; j++){
            /* If current cursor + j is in register artwork range */
            /* Then add the stuff into the sending artwork information array buffer */
            if(Cursor + j < ArtworkArray.length){
                /* Flip the trigger */
                /* Because we have at least one image to show */
                CanBeAdd = true;
                ASendingBuffer.push(ArtworkArray[Cursor + j]);
            }
        }

        /* For debug */
        console.log(Cursor + " " + CanBeAdd + " " + ASendingBuffer.length);

        /* Get the element from render function */
        ARow = function(){
            
            /* A row return element, this will place under the root */
            var result = document.createElement("div");
            $(result).attr("class", "showcase-horizontal row justify-content-center");

            /* Loop the patterm */
            /* Because index only show limit image, so we loop the patterm object */
            for(var k = 0; k < ArtworkPatterm[i].patterm.length; k++){

                /* Make the frame object, the grid system depend on patterm variable */
                var frame = document.createElement("div");
                $(frame).attr("class", "col-sm-" + ArtworkPatterm[i].patterm[k]  + " frame");

                var frameImage = document.createElement("div");
                $(frameImage).attr("class", "test-image aos-init aos-animate");
                $(frameImage).attr("data-aos", ArtworkPatterm[k].animatePatterm[k]);

                var Title = document.createElement("p");
                $(Title).attr("class", "text-image-p noselect");

                /* If render is finished, return */
                if(k < ASendingBuffer.length){
                    $(Title).text(ASendingBuffer[k].Title);

                    $(frameImage).append(Title);

                    $(frame).append(frameImage);

                    $(result).append(frame);
                }
            }

            return result;
        };

        if(CanBeAdd){
            $(parent).append(ARow);
        }
        Cursor = Cursor + ArtworkPatterm[i].patterm.length;
    }
}
//#endregion

/* Work page loading */
function RDWorkCoverLoading(){
    var parent = $("#showcase");
    for(var i = 0; i < ArtworkArray.length; i++){

    }
}

/* About page loading */
//#region About
function RDAboutProfileLoading(){
    var parent = $("#about-spawner");
    for(var i = 0; i < ProfileArray.length; i++){
        /* The outter box of the profile */
        var outterDiv = document.createElement("div");

        /* Including class and aos animation */
        $(outterDiv).attr("class", "profile-horizontal row justify-content-center aos-init aos-animate");
        $(outterDiv).attr("data-aos", "fade-up");

        /* Get the left page and right page */
        var leftDiv = RDGetProfilePage(i % 2 == 1, ProfileArray[i])
        var RightDiv = RDGetProfilePage(i % 2 != 1, ProfileArray[i])

        /* Append to outter div page */
        $(outterDiv).append(leftDiv);
        $(outterDiv).append(RightDiv);

        /* Append to parent root page */
        $(parent).append(outterDiv);
    }
}

/* About profile page getter */
function RDGetProfilePage(IsImage, profileObj){
    var result = $('<div></div>');
    if(IsImage){
        $(result).attr("class", "col-sm-6");
        var imagecontent = document.createElement("div");
        $(imagecontent).attr("class", "profile-image");
        $(imagecontent).css({
            'background-image': 'url(' + profileObj.CoverFileName + ')',
        });
        $(result).append(imagecontent);
        return result;
    }else{
        $(result).attr("class", "col-sm-6 noselect CenterText");
        var head1 = document.createElement("h1");
        var p1 = document.createElement("p");

        head1.innerText = profileObj.PersonName;
        p1.innerText = profileObj.PersonInformation;

        $(result).append(head1);
        $(result).append(p1);

        return result;
    }
}
//#endregion
//#endregion

/* Webitepage animation initialize, jquery animate */
function RDAnimationInitialize(){
    var hiddenOpacity = 0.6;
    var blockAnimationSpeed = 300;

    /* Set all block opaicity to default value */
    $(".test-image").css({
        opacity: hiddenOpacity
    });
    $(".test-image").find('p').css({
        opacity: 0
    });

    $(".test-image").mouseenter(function( event ){
        /* The main block animation */
        $( event.target ).animate({
            opacity: 0.9,
            backgroundSize: '200%'
        },
        blockAnimationSpeed, function(){
            // complete
            $( event.target ).css({
                opacity: 0.9,
                backgroundSize: '200%'
            });
            //$( event.target ).stop(false, true)
        });

        $( event.target ).find('p').animate({
            opacity: 1
        },
        blockAnimationSpeed, function(){
            // complete
            $( event.target ).find('p').animate({
                opacity: 1
            });
            //$( event.target ).stop(false, true)
        });
    });

    $(".test-image").mouseleave(function( event ){
        /* The main block animation */
        $( event.target ).animate({
            opacity: hiddenOpacity,
            backgroundSize : '150%'
        },
        blockAnimationSpeed, function(){
            // complete
            $( event.target ).css({
                opacity: hiddenOpacity,
                backgroundSize : '150%'
            });
            //$( event.target ).stop(false, true)
        });

        $( event.target ).find('p').animate({
            opacity: 0
        },
        blockAnimationSpeed, function(){
            // complete
            $( event.target ).find('p').animate({
                opacity: 0
            });
            //$( event.target ).stop(false, true)
        });
    });
}