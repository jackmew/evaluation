var deviceReadyDeferred = $.Deferred();
var jqmReadyDeferred = $.Deferred();

document.addEventListener("deviceReady", deviceReady, false);

$(document).ready(function(){
    console.log( "DOM ready!" );
    $.when(deviceReadyDeferred, jqmReadyDeferred).then(allReady);
});
$(document).one("mobileinit", mobileReady );

function deviceReady() {
        console.log("device ready!");
        deviceReadyDeferred.resolve();
}    
function mobileReady() {
    console.log("mobile ready!");
    //jquery mobile configuration
    $.extend( $.mobile , {
        defaultPageTransition: "flip"
    });
    /*
        slide
        slideup
        slidedown
        pop
        fade
        flip
    */
    jqmReadyDeferred.resolve();
}

//real entry point
function allReady() {
  // TBD
  console.log("all ready!");
}