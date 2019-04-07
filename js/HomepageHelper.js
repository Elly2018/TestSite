/* Artwork object specific */
/* Object will represend artwork */
class Artwork{
    constructor(CoverFileName, Title, ContentTitle, Description, FileLink, Tags){
        this.CoverFileName = CoverFileName;
        this.Title = Title;
        this.ContentTitle = ContentTitle;
        this.Description = Description
        this.FileLink = FileLink;
        this.Tags = Tags;
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

/* The about bottom carousel data set */
class AboutCarousel{
    constructor(CoverFileName, Title, Description){
        this.CoverFileName = CoverFileName;
        this.Title = Title;
        this.Description = Description;
    }
}

/* Initialize global variable */
/* For data store */
var ArtworkArray = [];
var ProfileArray = [];
var IndexArtworkPatterm = [];
var WorkArtworkPatterm = [];
var MyAboutCarousel = [];

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
    RDArtworkOnClickInitialize();
    AOS.init();
}

/* Variable initialization, add item from this function */
function RDVariableInitialize(){
    /* Get the html file name */
    var path = window.location.pathname;
    pageName = path.split("/").pop();

    /* Create artwork array data */
    ArtworkArray = [
        new Artwork("media/image/Testing.jpg", "待更新", 
        "標題", "內容", "https://www.youtube.com/embed/pJ_m5lDftYc", "HOMEPAGE:VFX"),
        new Artwork("media/image/Testing.jpg", "待更新", 
        "標題", "內容", "https://www.youtube.com/embed/pJ_m5lDftYc", "VFX"),
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

    /* Create carousel data set for about */
    MyAboutCarousel = [
        new AboutCarousel("media/image/TitleImage.jpg", "Test1", "Test Text"),
        new AboutCarousel("media/image/TitleImage.jpg", "Test2", "Test Text"),
        new AboutCarousel("media/image/TitleImage.jpg", "Test3", "Test Text")
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
            RDMyAboutCarouselLoading();
            break;
    }
}

/* Index page loading */
function RDIndexCoverLoading(){
    var parent = $("#showcase");

    /* The current cursor for array indexing */
    var Cursor = 0;

    var HomePagePageSize = GetTotalArrayPattermSize(IndexArtworkPatterm);

    var RenderList = GetArtworkPageByTagsList("HOMEPAGE", HomePagePageSize, 0)

    console.log(RenderList);

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
            if(Cursor + j < RenderList.length){
                /* Flip the trigger */
                /* Because we have at least one image to show */
                CanBeAdd = true;
                ASendingBuffer.push(RenderList[Cursor + j]);
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

/* Work page loading */
function RDWorkCoverLoading(){
    var parent = $("#showcase");
    var indexPage = Cookies.get("Page");

    var Cursor = 0;

    /* Get total render artwork size */
    var totalPattermSize = GetTotalArrayPattermSize(WorkArtworkPatterm);

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

/* About page loading */
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

/* About carousel loading */
function RDMyAboutCarouselLoading(){
    /* Link render */
    for(var i = 0; i < MyAboutCarousel.length; i++){
        /* Create a new list */
        var item = document.createElement("li");

        /* Set the attributes */
        $(item).attr("data-target", "#myCarousel");
        $(item).attr("data-slide-to", String(i));

        /* Set the first one to active */
        if(i == 0){
            $(item).attr("class", "active");
        }

        /* Append to root table */
        $(".carousel-indicators").append(item);
    }

    for(var i = 0; i < MyAboutCarousel.length; i++){

        var outterContainer = document.createElement("div");

        if(i == 0){
            $(outterContainer).attr("class", "item active");
        }else{
            $(outterContainer).attr("class", "item");
        }
        
        var cover = document.createElement("img");
        $(cover).attr("src", MyAboutCarousel[i].CoverFileName);
        $(cover).attr("alt", MyAboutCarousel[i].Title);
        $(cover).attr("style", "width:100%");

        var content = document.createElement("div");
        $(content).attr("class", "carousel-caption");

        var header = document.createElement("h2");
        $(header).html(MyAboutCarousel[i].Title);

        var info = document.createElement("p");
        $(info).html(MyAboutCarousel[i].Description);

        $(content).append(header);
        $(content).append(info);

        $(outterContainer).append(cover);
        $(outterContainer).append(content);

        $(".carousel-inner").append(outterContainer);
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

/* Get artwork array by tag and array limit and index of the page */
function GetArtworkPageByTagsList(tag, arraylimit, Indexpage){
    var result = [];
    var TotalList = GetArtworksByTagsList(tag);

    for(var i = 0; i < arraylimit; i++){
        if(TotalList.length > arraylimit * Indexpage + i){
            result.push(TotalList[arraylimit * Indexpage + i]);
        }
    }

    /* Return query result */
    return result;
}

/* Get artwork array by simply tag, return artworks that have tag in it */
function GetArtworksByTagsList(tag){
    var result = [];
    var tagArray = tag.split(':');

    /* Loop all the artwork */
    for(var i = 0; i < ArtworkArray.length; i++){
        /* Initialize trigger */
        var CanBeAdd = false;

        /* Loop all tag request */
        for(var j = 0; j < tagArray.length; j++){

            /* Get current selection artwork tags */
            var selectionTags = ArtworkArray[i].Tags.split(':');

            /* Loop the current selection artwork tags*/
            for(var k = 0; k < selectionTags.length; k++){

                /* Before the trigger flip, do the check */
                if(!CanBeAdd){

                    /* Check if the any tag match */
                    if(tagArray[j] == selectionTags[k]){
                        CanBeAdd = true;
                        result.push(ArtworkArray[i]);
                    }
                }
            }
        }
    }

    /* Return query result */
    return result;
}

function SetCookie(index){
    Cookies.set("Page", index);
}

function GetTotalArrayPattermSize(targetArray){
    var totalPattermSize = 0;
    for(var i = 0; i < targetArray.length; i++){
        totalPattermSize += targetArray[i].patterm.length;
    }
    return totalPattermSize;
}

function GetArtworkByTitleAndCover(t, tc){
    for(var i = 0; i < ArtworkArray.length; i++){
        if(ArtworkArray[i].Title == t, ArtworkArray[i].CoverFileName){
            return ArtworkArray[i];
        }
    }
}
//#endregion

//#region Animation setup
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

function RDArtworkOnClickInitialize(){
    var modal = document.getElementById('myModal');

    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
          $("#Shower").find("iframe").attr("src", "");
        }
      }

    $(".test-image").click(function(event){
        $("#myModal").css({'display':'block'});
        var ArtworkSelection = GetArtworkByTitleAndCover($(event).attr("ArtworkTitle"), $(event).attr("ArtworkPath"));
        if(ArtworkSelection != null){
            $("#Content").find("h1").html(ArtworkSelection.ContentTitle);
            $("#Content").find("p").html(ArtworkSelection.Description);
            $("#Shower").find("iframe").attr("src", ArtworkSelection.FileLink);
        }
    });
}
//#endregion