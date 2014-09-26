$(document).on( "pagecontainershow", function(){
    ScaleContentToDevice();
    
    $(window).on("resize orientationchange", function(){
        ScaleContentToDevice();
    })
});

function ScaleContentToDevice(){
    scroll(0, 0);
    var content = $.mobile.getScreenHeight() - $(".ui-header").outerHeight() -  $(".ui-footer").outerHeight() - $(".ui-content").outerHeight() + $(".ui-content").height();
    var removefooterUp = content+2;
    $(".ui-content").height(removefooterUp);
}