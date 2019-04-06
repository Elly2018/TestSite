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
var IndexArtworkPatterm = [];
var WorkArtworkPatterm = [];

/* Page title path */
var IndexHomePageFilePath = "";
var AboutPageFilePath = "";

var IndexHomePageBackground;
var AboutPageBackground;

var pageName = "";

// The script that response for the web page rendering
function RDonload(){

    /* RD stand for result design */
    RDVariableInitialize();
    RDCoverLoading();
    RDAnimationInitialize();
    AOS.init();
}

/* Variable initialization, add item from this function */
function RDVariableInitialize(){
    /* Get the html file name */
    var path = window.location.pathname;
    pageName = path.split("/").pop();

    /* Create artwork array data */
    ArtworkArray = [
        new Artwork("media/image/Testing.jpg", "待更新"),
    ];

    /* Create profile array data */
    ProfileArray = [
        new Profile("media/image/profile.png", "奇昌", "平面網頁工程師"),
        new Profile("media/image/profile.png", "君昊", "特效合成師"),
        new Profile("media/image/profile.png", "文杰", "建模與材質設計師"),
        new Profile("media/image/profile.png", "昱安", "後端工程與遊戲工程師"),
        new Profile("media/image/profile.png", "宥宇", "建模師"),
        new Profile("media/image/profile.png", "冠宇", "角色設計師"),
        new Profile("media/image/profile.png", "沅叡", "待更新")
    ];

    /* Create patterm that use for index webpage animation */
    IndexArtworkPatterm = [
        new WorkRenderPatterm("4:8", "flip-right:flip-left"),
        new WorkRenderPatterm("8:4", "flip-left:flip-right"),
        new WorkRenderPatterm("4:4:4", "fade-up:fade-up:fade-up"),
        new WorkRenderPatterm("4:8", "flip-right:flip-left"),
        new WorkRenderPatterm("8:4", "flip-left:flip-right"),
        new WorkRenderPatterm("4:8", "flip-right:flip-left"),
        new WorkRenderPatterm("12", "fade-up")
    ];

    /* Create patterm that use for work webpage animation */
    WorkArtworkPatterm = [
        new WorkRenderPatterm("4:8", "flip-right:flip-left"),
        new WorkRenderPatterm("8:4", "flip-left:flip-right"),
        new WorkRenderPatterm("4:4:4", "fade-up:fade-up:fade-up"),
        new WorkRenderPatterm("4:8", "flip-right:flip-left"),
        new WorkRenderPatterm("8:4", "flip-left:flip-right"),
        new WorkRenderPatterm("4:8", "flip-right:flip-left"),
        new WorkRenderPatterm("12", "fade-up"),
        new WorkRenderPatterm("4:8", "flip-right:flip-left"),
        new WorkRenderPatterm("8:4", "flip-left:flip-right"),
        new WorkRenderPatterm("4:4:4", "fade-up:fade-up:fade-up")
    ];

    /* Specifie the top title image or video path and type */
    IndexHomePageFilePath = "media/video/HomeTitle.mp4";
    AboutPageFilePath = "media/image/TitleImage.jpg";

    /* The title backgound color */
    IndexHomePageBackground = "#000000";
    AboutPageBackground = "#000000";

    $("#RDTitle").text("Result");
    $("#RDDescription").html("我們結合了跨領域的人才 <br > 負責的項目從遊戲、 動畫, 到特效、後製合成製作");
    $("#Introducing").find('p').html("Result Design 是因興趣而聚集起來創作的工作室.");
}

//#region Loading cover part
/* Loading work into webpage */
function RDCoverLoading(){
    /* Action depend on the name of the file */
    switch(pageName){
        /* Homepage loading */
        case "index.html":
            SetCookie(0);
            RenderTitleImageOrVideo(IndexHomePageFilePath, IndexHomePageBackground);
            RDIndexCoverLoading();
            break;
        /* Homepage loading */
        case "":
            SetCookie(0);
            RenderTitleImageOrVideo(IndexHomePageFilePath, IndexHomePageBackground);
            RDIndexCoverLoading();
            break;
        /* Work loading */
        case "work.html":
            RDWorkCoverLoading();
            break;
        /* About loading */
        case "about.html":
            SetCookie(0);
            RenderTitleImageOrVideo(AboutPageFilePath, AboutPageBackground);
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
    for(var i = 0; i < IndexArtworkPatterm.length; i++){
        /* Row buffer and sending artwork information array buffer */
        var ARow;
        var CanBeAdd = false;
        var ASendingBuffer = [];

        /* Loop the patterm */
        for(var j = 0; j < IndexArtworkPatterm[i].patterm.length; j++){
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

        if(CanBeAdd){
            /* Get the element from render function */
            ARow = function(){
                        
                /* A row return element, this will place under the root */
                var result = document.createElement("div");
                $(result).attr("class", "showcase-horizontal row justify-content-center");

                /* Loop the patterm */
                /* Because index only show limit image, so we loop the patterm object */
                for(var k = 0; k < IndexArtworkPatterm[i].patterm.length; k++){

                    /* Make the frame object, the grid system depend on patterm variable */
                    var frame = document.createElement("div");
                    $(frame).attr("class", "col-sm-" + IndexArtworkPatterm[i].patterm[k]  + " frame");

                    var frameImage = document.createElement("div");
                    $(frameImage).attr("class", "test-image aos-init aos-animate");
                    $(frameImage).attr("data-aos", IndexArtworkPatterm[i].animatePatterm[k]);

                    var Title = document.createElement("p");
                    $(Title).attr("class", "text-image-p noselect");

                    /* If render is finished, return */
                    if(k < ASendingBuffer.length){
                        $(frameImage).css({
                            'background':'url(' + ASendingBuffer[k].CoverFileName + ')',
                            'height': '450px',
                            'background-repeat': 'no-repeat',
                            'background-position': 'center',
                            'background-size': '150%'
                        });

                        $(Title).text(ASendingBuffer[k].Title);

                        $(frameImage).append(Title);

                        $(frame).append(frameImage);

                        $(result).append(frame);
                    }
                }

                return result;
            };

            $(parent).append(ARow);
        }
        Cursor = Cursor + IndexArtworkPatterm[i].patterm.length;
    }
}
//#endregion

/* Work page loading */
function RDWorkCoverLoading(){
    var parent = $("#showcase");
    var indexPage = Cookies.get("Page");

    var Cursor = 0;

    /* Get total render artwork size */
    var totalPattermSize = 0;
    for(var i = 0; i < WorkArtworkPatterm.length; i++){
        totalPattermSize += WorkArtworkPatterm[i].patterm.length;
    }
    console.log("The total size of patterm: " + totalPattermSize);

    /* The top place space, we need to add this space before render processes */
    $(parent).append("<div class='worktopgap'></div>");

    /* Loop all the patterm */
    for(var i = 0; i < WorkArtworkPatterm.length; i++){
        /* Row buffer and sending artwork information array buffer */
        var ARow;
        var CanBeAdd = false;
        var ASendingBuffer = [];

        /* Loop single patterm element */
        for(var j = 0; j < WorkArtworkPatterm[i].patterm.length; j++){
            /* If current cursor + j is in register artwork range */
            /* Then add the stuff into the sending artwork information array buffer */
            if(Cursor + j + (indexPage * totalPattermSize) < ArtworkArray.length){
                /* Flip the trigger */
                /* Because we have at least one image to show */
                CanBeAdd = true;
                ASendingBuffer.push(ArtworkArray[Cursor + j + (indexPage * totalPattermSize)]);
            }
        }

        /* For debug */
        console.log(Cursor + " " + CanBeAdd + " " + ASendingBuffer.length);

        if(CanBeAdd){
            /* Get the element from render function */
            ARow = function(){
                        
                /* A row return element, this will place under the root */
                var result = document.createElement("div");
                $(result).attr("class", "showcase-horizontal row justify-content-center");

                /* Loop the patterm */
                /* Because index only show limit image, so we loop the patterm object */
                for(var k = 0; k < WorkArtworkPatterm[i].patterm.length; k++){

                    /* Make the frame object, the grid system depend on patterm variable */
                    var frame = document.createElement("div");
                    $(frame).attr("class", "col-sm-" + WorkArtworkPatterm[i].patterm[k]  + " frame");

                    var frameImage = document.createElement("div");
                    $(frameImage).attr("class", "test-image aos-init aos-animate");
                    $(frameImage).attr("data-aos", WorkArtworkPatterm[i].animatePatterm[k]);

                    var Title = document.createElement("p");
                    $(Title).attr("class", "text-image-p noselect");

                    /* If render is finished, return */
                    if(k < ASendingBuffer.length){
                        $(frameImage).css({
                            'background':'url(' + ASendingBuffer[k].CoverFileName + ')',
                            'height': '450px',
                            'background-repeat': 'no-repeat',
                            'background-position': 'center',
                            'background-size': '150%'
                        });

                        $(Title).text(ASendingBuffer[k].Title);

                        $(frameImage).append(Title);

                        $(frame).append(frameImage);

                        $(result).append(frame);
                    }
                }

                return result;
            };

            $(parent).append(ARow);

            Cursor = Cursor + WorkArtworkPatterm[i].patterm.length;
        }
    }
}

function SetCookie(index){
    Cookies.set("Page", index);
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
        $(result).attr("class", "col-sm-6 noselect CenterText profile");
        var head1 = document.createElement("h1");
        var p1 = document.createElement("p");

        head1.innerHTML = profileObj.PersonName;
        p1.innerHTML = profileObj.PersonInformation;

        $(result).append(head1);
        $(result).append(p1);

        return result;
    }
}
//#endregion
//#endregion

//#region Useful render function
function RenderTitleImageOrVideo(path, color){
    var parent = $("#title-shower");

    var filename = path.split('/').pop();
    var extension = filename.split('.').pop();

    /* Render image */
    if(extension.toLowerCase() == "jpg" ||
    extension.toLowerCase() == "png" ){
        $(parent).css({
            "background":"url('" + path + "')",
            "height": "100vh",
            "background-repeat": "no-repeat",
            "background-position": "center",
            "background-size": "cover",
            "filter": "brightness(90%)"
        });
    }
    /* Render video */
    if(extension.toLowerCase() == "mp4"){

        $(parent).replaceWith("<video id='title-shower' autoplay></video>");

        parent = $("#title-shower");

        $(parent).css({
            "height": "100vh",
            "background-color": color,
            "background-repeat": "no-repeat",
            "background-position": "center",
            "background-size": "100vh",
            "filter": "brightness(90%)"
        });

        var sourceElement = document.createElement("source");

        $(parent).attr("width", "100%");
        $(parent).attr("height", "100%");

        $(sourceElement).attr("src", path);
        $(sourceElement).attr("type", "video/" + extension.toLowerCase());

        $(parent).append(sourceElement);

        $(parent).attr("loop", "loop");
    }
}
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

    $(".test-image").hover(function()
    { 
       $(this).toggleClass('classWithShadow');
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