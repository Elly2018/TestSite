var coverobj = [];

// The script that response for the web page rendering
function RDonload(){

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

function RDOnTItleWork(){

}

function ImageZoomIn(e){
    var d = e.target;
}

function ImageZoomOut(e){
    var d = e.target;
}