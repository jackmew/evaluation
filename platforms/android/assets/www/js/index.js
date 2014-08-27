var deviceReadyDeferred = $.Deferred();
var jqmReadyDeferred = $.Deferred();

//document.addEventListener("deviceReady", deviceReady, false);

$(document).ready(function(){
    console.log( "DOM ready!" );
    //監聽 deferred()物件的狀態
    //$.when(deviceReadyDeferred, jqmReadyDeferred).then(allReady);
    //當deferred物件的狀態都改為成功時(解決) 就執行allReady
    //jquery / jqueyr moblie / device ready


    // 暫時改成只要jquery/jquery mobile 就好
    allReady();
});
// $(document).one("mobileinit", mobileReady );
//
// function deviceReady() {
//         console.log("device ready!");
//         deviceReadyDeferred.resolve();
// }
// function mobileReady() {
//     console.log("mobile ready!");
//     //jquery mobile configuration
//     $.extend( $.mobile , {
//         defaultPageTransition: "flip"
//     });
//
//     jqmReadyDeferred.resolve();
// }

//real entry point
function allReady() {
  // TBD
  console.log("all ready!");
  $("#testBtn").on("touchstart",onTestBtnTouch);


  contact();
  systemMessage();
}

function onTestBtnTouch(){
    console.log("test");

    console.log(device.cordova);
    console.log(device.uuid);
    console.log(device.version);
}

function contact() {

    $("#contact a[href='#contactDetail']").click(function() {
        var name = $(this).text();
        $("#contactDetail h2").text(name);
    });
}

function systemMessage() {
    var datesArr = [];
    //$( "#datepicker" ).datepicker();
    //$( "#datepicker" ).multiDatesPicker();
    $( "#chooseDates" ).multiDatesPicker({
      onSelect: function(dateText,instance){
        // var chosenDatesStr = $("input[name='chosenDates']").val();

        // if( chosenDatesStr.indexOf("08/13/2014") >= 0) {
        //   alert("123");
        // }

        // if ( chosenDatesStr != "" ) {
        //   var newChosenDates = chosenDatesStr+" , "+dateText;
        // } else {
        //   var newChosenDates = dateText;
        // }
        //   $("input[name='chosenDates']").val(newChosenDates);

  
        var isSame = false ;
        var indexSame = -1;

        $.each(datesArr, function(index, value){
          //console.log("INDEX: " + index + " VALUE: " + value);     
          if ( dateText === value) {
              isSame = true;
              indexSame = index;
              return false;
          } 
        });
        if ( isSame ) {
          datesArr.splice(indexSame , 1);
        } else {
          datesArr.push(dateText);
        }
        $("input[name='chosenDates']").val(datesArr);

      }
    });
}







































//
