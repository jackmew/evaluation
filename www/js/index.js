function documentReadyEvent(deviceReadyDeferred,jqmReadyDeferred) {
    $(document).ready(function(){
        console.log( "DOM ready!" );
        //$.when(deviceReadyDeferred, jqmReadyDeferred).then(app.allReady); alert
        app.allReady();
    });
}
function deviceReadyEvent(deviceReadyDeferred) {
    document.addEventListener("deviceReady", function(){
        console.log("device ready!");
        deviceReadyDeferred.resolve();
    }, false);
}
function jqueryMobileReadyEvent(jqmReadyDeferred) {
    $(document).one("mobileinit", function(){
        console.log("mobile ready!");
        //jquery mobile configuration
        $.extend( $.mobile , {
            defaultPageTransition: "slide"
        });

        jqmReadyDeferred.resolve();
    });
}
var app = {
    deviceReadyDeferred : $.Deferred(),
    jqmReadyDeferred : $.Deferred(),
    init : function() {
        this.addEvent();
        //alert("app init");
    },
    addEvent : function() {
        documentReadyEvent(this.deviceReadyDeferred,this.jqmReadyDeferred);
        deviceReadyEvent(this.deviceReadyDeferred);
        jqueryMobileReadyEvent(this.jqmReadyDeferred);
    }
    ,
    allReady : function() {
        //alert("all ready");

        setGlobalVariable();
    
        pageManager.init();
       
        entryPage.init();

        homePage.init();

        contactPage.init();

        systemMessagePage.init();

        discussionPage.init();

        downloadPage.init();

        notificationBadge();


        //this.getFile();
    },
    // getFile : function () {
    //   console.log("get file");

    //   $.ajax({
    //       url:"download/image/elephant.jpg",
    //       success:function(result){
    //           //alert("s");
    //           //console.log("success: "+result);
    //           $(result).find("a:contains(.jpg)").each(function(){
    //           // will loop through 
    //           var images = $(this).attr("href");
    //           //alert(images);
             
    //           });//end each
             
    //       },
    //       error:function(xhr,status,error){
    //           alert("error : "+error);
    //       }
    //   });
    // }

};
/********************** define Message object ******************************/
function Message(mid ,title,description,date,time,read,important) {
  this.mid = mid;
  this.title = title ;
  this.description = description ;
  this.date = date ;
  this.time = time ;
  this.milli = moment(date+' '+time).valueOf();//date & time => transfer to long
  this.read = read ;
  this.important = important ;
}
/********************** define Set ****************************/
var Set = function(o) {this['name'] = o}
//Set.prototype.setName = function(o) { this['name'] = o }
Set.prototype.add = function(o) { this[o] = true; }
Set.prototype.remove = function(o) { delete this[o]; }
/********************** End define Set ************************/
/********************** End define Message object ******************************/

function setGlobalVariable() {
  /*************************** global variable ********************************/
  /******* Home *******/
  /* calendar */
  EventSaved = [];
  /******* System Message *******/
  toAddEventObject = {};


  messageArr = [];
  /* 2014/08/25 message send time */
  message1 = new Message('1', '評鑑邀請','1125(W1)','2014/08/25' , '10:24',true,true);
  message2 = new Message('2', '評鑑邀請','2498(W3)','2014/08/26' , '11:10',false,false);
  message3 = new Message('3', 'NCR改善','3398(W1)','2014/08/25' , '12:35',true,true);
  message4 = new Message('4', '評鑑邀請','1130(W2)','2014/08/25' , '13:35',true,false);
  message5 = new Message('5', 'NCR改善','1248(W2)','2014/08/26' , '08:00',false,false);
  message6 = new Message('6', 'NCR改善','1258(W3)','2014/09/25' , '09:00',false,false);

  messageArr.push(message1);
  messageArr.push(message2);
  messageArr.push(message3);
  messageArr.push(message4);
  messageArr.push(message5);
  messageArr.push(message6);

  /******* Discussion *******/
  isFirstSubmit = false;
}
function notificationBadge() {
    setTimeout(function(){
        cordova.plugins.notification.badge.configure({ 
                title: '%d 系統訊息 未讀',
                smallIcon: 'icon' ,//根據你app的圖案
                //android :當進入notification點擊後 就會消失 
                //ios :  按下app icon 後 ballon counter就會消失
                autoClear: true 
            });
        cordova.plugins.notification.badge.set('3');
    }, 5000);
}

var pageManager = {
    init : function () {
        this.addEvent();
    },
    addEvent : function () {
        var pagemanager = this ;
        
        this.addPagecontainerbeforeshowEvent(pagemanager);
        this.addPagecontainerbeforehideEvent();
    },
    addPagecontainerbeforeshowEvent : function(pagemanager) {
        $( document ).on( "pagecontainerbeforeshow" , function(e, ui) {
            pagemanager.resetPage();


            // pagemanager.ScaleContentToDevice();
            
            // $(window).on("resize orientationchange", function(){
            //     pagemanager.ScaleContentToDevice();
            // })
        });
    },
    addPagecontainerbeforehideEvent : function() {
        /* this is for detect what next page is  */
        $( document ).on( "pagecontainerbeforehide" ,function(e, data) {

            //console.log("Next Page : "+data.nextPage[0].id);
            if(data.nextPage[0].id === "systemMessage"){
               systemMessagePage.destroy();
               systemMessagePage.init();
               $("#unread ul[data-role='listview']").listview("refresh");
               $("#read ul[data-role='listview']").listview("refresh");
               $("#important ul[data-role='listview']").listview("refresh");

            }
            
        });
    },
    resetPage : function () {
        /* home */
        renderYourCalendar();
        //$('#calendar').hide();
        /* system message */
        $("#btnJoin").removeClass('ui-disabled');
        /* tab */
        $("#tabX li:first-child a").addClass("ui-state-persist");
        $.mobile.activePage.find("div [data-role=tabs] ul li:first-child a").click();
        // $( "#inviteMessage p" ).remove();
        $("#inviteMessage p").remove();
        $("#inviteMessage div").remove();
        $("#renderCalendar").off();
        /* discussion */
        //$("#talkBox p").remove();
        $("#talkBox p").remove();  
        $("#talkBox br").remove(); 
        isFirstSubmit = false;
        
        /* download */
        $("#showDownloadImage div").remove();
        $("#showDownloadPdf div").remove();
        $("#showDownloadFile div").remove();

        
    }
    // ,
    // ScaleContentToDevice : function() {
    //     scroll(0, 0);
    //     var content = $.mobile.getScreenHeight() - $(".ui-header").outerHeight() -  $(".ui-footer").outerHeight() - $(".ui-content").outerHeight() + $(".ui-content").height();
    //     var removefooterUp = content+2;
    //     $(".ui-content").height(removefooterUp);
    // }
}


var entryPage = {
    init : function () {
        // $(document).on('pageinit', '#entry', function () {
     
        jQMProgressBar('progressbar')
            .setOuterTheme('b')
            .setInnerTheme('e')
            // .setOuterTheme('d')
            // .setInnerTheme('d')
            .isMini(true)
            .setMax(100)
            .setStartFrom(0)
            .setInterval(10)
            .showCounter(true)
            .build()
            .run();
        // });

        this.addEvent();
    },
    addEvent : function () {
        /* complete stand for 100% loading */
        $(document).on('complete', '#progressbar', function () {
            //alert("complete");
            $.mobile.changePage( "#home", { transition: "slideup", changeHash: false });
        });
    }
};

var homePage = {
    init : function () {
      //alert("homepage init");
      initYourCalendar();
      renderYourCalendar();
      this.addEvent();
    },
    addEvent: function () {
      $("#btnCalendar").on("click", hideOrShowCalendar);

      $("#addCalendarEvent").on("click",addCalendarEvent);

      $("#removeCalendarEvent").on("click",removeCalendarEvent);

      $("#getAllCalendarEvents").on("click",getAllCalendarEvents);

      $("#calendarPrev").on("click",calendarPrevClick);
      $("#calendarToday").on("click",calendarTodayClick);
      $("#calendarNext").on("click",calendarNextClick);
    } 
};
function initYourCalendar() {
  // var eventWrapper1 = {
  //       id: 1078,
  //       title: "1078(W2)", 
  //       start: "2014-09-01",
  //       end: "2014-09-13",
  //       color: "#3a87ad"
  // };
  var eventWrapper2 = {
        id: 2156,
        title: "2156(L1)", 
        start: "2014-09-18",
        end: "2014-09-25",
        color: "#3a87ad"
  };

  $('#calendar').fullCalendar({
      theme: true,
      contentHeight: 400,
      header: {
        left: 'prev,today,next ',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2014-09-12',
      editable: true,
      eventLimit: true,
      events: [
        // {
        //     id : eventWrapper1.id,
        //     title  : eventWrapper1.title,
        //     start  : eventWrapper1.start,
        //     end : eventWrapper1.end
        // },
        {
            id : eventWrapper2.id,
            title  : eventWrapper2.title,
            start  : eventWrapper2.start,
            end : eventWrapper2.end
        }
    ]
      
    });
    //EventSaved.push(eventWrapper1);
    EventSaved.push(eventWrapper2);
    /* hide calendar default header */
    $("div.fc-toolbar").hide();
}
function renderYourCalendar() {

  setTimeout(function(){
    /* render calender */
    $('#calendar').fullCalendar('render');
    /* render calender events */
    $('#calendar').fullCalendar('rerenderEvents');
    calendarTodayClick();
  }, 1000);

$("#calendarHeader").fadeIn(7000);
$("#calendar").fadeIn(5000);


}
function addCalendarEvent(){
  //console.log("addCalendarEvent");
  var eventDate = {
    title: 'jackho',
    id: 1,
    start: new Date(2014,7,2), //月份 +1 才是現在月份
    end: new Date(2014,7,4),
    color: "pink"
    // ,
    // textColor: "black",
    // backgroundColor: "green",
    // borderColor: "purple"
  }
  //$('#calendar').fullCalendar('renderEvent', eventDate, true); // stick? = true
  
}//End addCalendarEvent
function removeCalendarEvent() {
  //console.log("removeCalendarEvent");

  $("#calendar").fullCalendar('removeEvents',1);
}//End removeCalendarEvent
function getAllCalendarEvents() {
  var allEventsArr  = $('#calendar').fullCalendar('clientEvents');
  console.log(allEventsArr);
  $.each( allEventsArr, function( index, value ) {
    console.log( index + ": " + value.id);
  });

}//End getAllCalendarEvents
function hideOrShowCalendar(){
   var isCalendarVisible = $("#calendar").is(":visible");
    if (isCalendarVisible) {
      $('#calendar').hide();
    }else {
      /* div hide to show */
      $('#calendar').show();
      /* render calender */
      $('#calendar').fullCalendar('render');
      /* render calender events */
      $('#calendar').fullCalendar('rerenderEvents');
    }
}//End hideOrShowCalendar
function triggerEvent() {
    $("#calendar .fc-next-button").click();
}
function calendarNextClick() {
    $("#calendar .fc-next-button").click();
    refreshCalendarTitle();
}
function calendarTodayClick() {
    $("#calendar .fc-today-button").click();
    refreshCalendarTitle();
}
function calendarPrevClick() {
    $("#calendar .fc-prev-button ").click();
    refreshCalendarTitle();
}
function refreshCalendarTitle() {
    var title = $("#calendar h2").text();
    $("#calendarHeader h3").text(title);
}

var contactPage = {

    init : function () {
        this.addEvent();
    },
    addEvent : function (){
        this.contactDetailClick();
    },
    contactDetailClick : function () {
        $("#contact a[href='#contactDetail']").click(function() {
            var name = $(this).text();
            $("#contactDetail h2").text(name);
        });
    }
};


var systemMessagePage = {
    init : function() {
      initSystemMessage();
      this.addEvent();
    },
    addEvent : function() {
      bindStartYellowClick();
      bindMessageInListviewClick();

      systemMessageToCalendar();
      
      sureJoinClick();


    },
    destroy :function() {
      $("#tab-systemMessage ul[data-role='listview'] li").remove();
      $("a[name='importantOrNot']").off();
      $("#unread a[name='messageInListview']").off();
      $("#systemMessage ul[data-role='listview'] a").off();
      $("#renderCalendar").off();
      $("#sureJoin").off();
      //messageArr = [];
    }

};
/* 初始化 system message page */
function initSystemMessage() {
    //local variable in system message 
    /********************** define Set ******************************/
    var Set = function(o) {this['name'] = o}
    //Set.prototype.setName = function(o) { this['name'] = o }
    Set.prototype.add = function(o) { this[o] = true; }
    Set.prototype.remove = function(o) { delete this[o]; }
    /********************** End define Set ************************/
    /****** 1. unread array 2. read array 3. important array *****/
    var unreadArr = [];
    var readArr = [];
    var importantArr = [];
    /****** 1. unread no same data 2. read array no same data 3. important array no same data *****/
    var unreadSet = new Set("unread");
    var readSet = new Set("read");
    var importantSet = new Set("important");

    var setArr = [];
   
    // messageArr.push(message1);
    // messageArr.push(message2);
    // messageArr.push(message3);
    // messageArr.push(message4);
    // messageArr.push(message5);
    // messageArr.push(message6);

    addArr();
    sortArr();
    addSet();
    iterateSetArr();
    //bindStartYellowClick();
    //bindMessageInListviewClick();

    /*************** push data into 1.readArr 2.unreadArr 3. importantArr ***************/
    function addArr() {
      $.each(messageArr,function(index,value) {
          //如果這個message還沒有set
          if(messageArr[index].read) {
             readArr.push(value);
          } else {
             unreadArr.push(value);
          }
          if(messageArr[index].important) {
             importantArr.push(value);
          }
      });
    }// End addArr
    
    
    /*************** depend on dateTime to sort 1.readArr 2.unreadArr 3. importantArr *****/
    function sortArr() {
      unreadArr.sort(compareMilli);
      readArr.sort(compareMilli);
      importantArr.sort(compareMilli);
    }//End sortArr
    
    /* 在放入 Set 之前 已經有排序過 , 所以Set內的date也都有排序過 */  
    function addSet(){
      /*************** push unique date into 1. unreadSet  *********************/
      $.each(unreadArr,function(index,value){
          if( !(value.date in unreadSet) ) {
              unreadSet.add(value.date);
          }
      });
      setArr.push(unreadSet);
      //console.log(unreadSet);
      /*************** push unique date into 2. readSet ***********************/
      $.each(readArr,function(index,value){
          if( !(value.date in readSet) ) {
              readSet.add(value.date);
          }
      });
      setArr.push(readSet);
      //console.log(readSet);
      /*************** push unique date into 3. importantSet *******************/
      $.each(importantArr,function(index,value){
          if( !(value.date in importantSet) ) {
              importantSet.add(value.date);
          }
      });
      setArr.push(importantSet);
    }//End addSet
    function iterateSetArr () {
      $.each(setArr,function(index,value) {
          //console.log(value);
          iterateSet(value);
      });
    }//End iterateSetArr

    function iterateSet(aSet) {
      //console.log(aSet);
      //將Set內的 每一筆 date 都取出來 , 取一筆 就去放入一個list-divider , 然後列出同一時間的資料在listview
      $.each(aSet,function(index,value){
          //console.log("all :"+index);
          if( index !== "add" && index !== "remove" && index !== "name" ){
            //console.log(index);
            var date = index;
            var type = aSet.name;
            //console.log(type);

            setListDivider(date,type);
            //setListView(date,type);
          }
      });
    }//End iterateSet 

    
    function setListDivider(date,type) {
      //console.log("setListDivider");
      $("#"+type+" ul[data-role='listview']").append('<li data-role="list-divider">'+date+'</li>');
      
      setListView(date,type);
    }// End setListDivider

    function setListView(date,type) {

        var toDoArr ;

        switch(type) {
          case "read":
            //alert("read");
            toDoArr = readArr;
            break;
          case "unread":
          //alert("unread");
            toDoArr = unreadArr;
            break;
          case "important":
          //alert("important");
            toDoArr = importantArr;
            break;
        }
        //console.log(toDoArr[0].date);

        $.each(toDoArr , function(index,value){
            console.log(toDoArr);
            //alert("value.date :"+value.date+" date "+date);
            if( value.date != date ) {
              //console.log("not the same date , do nothing");
              //return true;
            } else {
              //console.log("setListView");
              //console.log(value);
              $("#"+type+" ul[data-role='listview']").append(
                '<li>'+
                  '<a name="messageInListview" href="#invite">'+
                    '<span style="display:none;">'+value.mid+'</span>'+
                    '<h2>'+value.title+'</h2>'+
                    '<p><strong>'+value.description+'</strong></p>'+
                    '<p class="ui-li-aside">'+value.time+'</p>'+
                  '</a>'+
                  '<a name="importantOrNot" href=""></a>'+
                '</li>');

            }
        });


        
    }//End setListView
    
    // Compare dates to sort
    function compareMilli(a,b) {
        if(a.milli < b.milli) return -1; //若 a 小於 b，在排序後的數組中 a 應該出現在 b 之前，則返回一個小於 0 的值。
        if(a.milli > b.milli) return 1;  //若 a 大於 b，在排序後的數組中 a 應該出現在 b 之前，則返回一個小於 0 的值。
        return 0; // 若 a 等於 b，則返回 0。
    }//End comareMilli
}//End initSystemMessage
/* 當按下星星時 將message變成important or not important */
function bindStartYellowClick() {
 
    $("a[name='importantOrNot']").click(function() {

      var mid = $(this).parent().children().children("span").text();
      var message = getMessageById(mid);
      
      var anchorOwnClass = $(this).attr("class");
      
      if(anchorOwnClass.indexOf("ui-icon-star") > -1) {
       
         $(this).addClass("ui-icon-starYellow").removeClass("ui-icon-star");

         message.important = true;

      }
      if(anchorOwnClass.indexOf("ui-icon-starYellow") > -1) {
         $(this).addClass("ui-icon-star").removeClass("ui-icon-starYellow");
         message.important = false;
      }
      
    });
}//EndbindStartYellowClick
/* 當按下listview去看訊息後 read = true 已讀 */
function bindMessageInListviewClick() {
    $("#unread a[name='messageInListview']").click(function() {
      var mid = $(this).children("span").text();
      // get message object
      var message = getMessageById(mid);
      // set to read 已讀
      message.read = true;
    });
}//End bindMessageInListviewClick
function getMessageById(mid){
    var message ;

    $.each(messageArr,function(index,value){
        if(value.mid === mid){
          message = value;
          return false;
        }
    });
    return message ;
}//End getMessageById
function systemMessageToCalendar(){
  $("#systemMessage ul[data-role='listview'] a").click(function() {      
        /*根據按下去的livstview 不同 改變calendar*/
        var evaluationName = $(this).children("p").children("strong").text();
        var evaluationMain = $(this).children("h2").text();
        // 先resetPage 再將資訊填在page上
        setTimeout(function(){
          addInviteCalendarEvent(evaluationName,evaluationMain);
        },100);
        
  });
}//End systemMessageToCalendar
function renderCalendarClick(){
  $("#renderCalendar").on("click",hideOrShowInviteCalendar);
}
function sureJoinClick() {
  $("#sureJoin").click(function() {
      setTimeout(function(){
        /* 將這個事件存起來 */
        toAddEventObject.color = "#3a87ad";
        EventSaved.push(toAddEventObject);
        /* 將這個事件 加入行事曆中*/
        $('#calendar').fullCalendar('renderEvent', toAddEventObject, true); // stick? = true
        /* save toAddEventObject to EventSaved array */
                /* refresh inviteCalendar*/
        //$('#calendar').fullCalendar('render');
        /* 顯示 已加入行事曆 訊息 */
        $("#popupBasic-joined").popup( "open" );
        /* 參加 button disable */
        $( "#btnJoin" ).addClass('ui-disabled');
        

      }, 1000);
      
    }); 
}
function addInviteCalendarEvent(evaluationName,evaluationMain) {

  var eventWrapper;
  switch(evaluationName) {
    case "1125(W1)" :
        eventWrapper = {
          id: 1125,
          start: "2014-09-12",
          end: "2014-09-16",
        };
        break;
    case "1130(W2)" :
        eventWrapper = {
          id: 1130,
          start: "2014-09-14",
          end: "2014-09-21",
        };
        break;
    case "1248(W2)" :
        eventWrapper = {
          id: 1248,
          start: "2014-10-14",
          end: "2014-10-22",
        };
        break;
    case "1258(W3)" :
        eventWrapper = {
          id: 1258,
          start: "2014-10-25",
          end: "2014-10-30",
        };
        break;
    case "2498(W3)" :
        eventWrapper = {
          id: 2498,
          start: "2014-09-23",
          end: "2014-09-27",
        };
        break;
    case "3398(W1)" :
        eventWrapper = {
          id: 3398,
          start: "2014-11-05",
          end: "2014-11-15",
        };
        break;
    default:     
        console.log("do nothing");
  }//End switch 
  eventWrapper.title = evaluationName;
  eventWrapper.main = evaluationMain;
  eventWrapper.color = "#c6c1c7";
  addInviteCalendarEventToCalendar(eventWrapper);

}//End addInviteCalendarEvenvar
function addInviteCalendarEventToCalendar(eventWrapper){
  
  /*改變invite message*/
  //alert(eventWrapper.main);
  if(eventWrapper.main == "NCR改善") {
    $("#inviteMessage").append('<p>'+eventWrapper.main+':</p>').append('<p>'+eventWrapper.title+'申請者已回覆不符合事項的改善內容,請確認改善措施.</p>');
  }else {
    $("#inviteMessage").append('<p>'+eventWrapper.main+':</p>')
                       .append("<p>邀請汪小華委員參與"+eventWrapper.title+"溫室氣體認證,評鑑期間"+eventWrapper.start+"~"+eventWrapper.end+",請回覆可否參加:</p>")
                       .append('<div id="inviteRenderCalendar">'+
                                  '<button id="renderCalendar" class="ui-shadow ui-btn ui-corner-all ui-icon-plus ui-btn-icon-right">觀看工作日誌</button>'+
                                  '<div id="inviteCalendar" name="calendar" style="display:none;"></div>'+
                              '</div>')
                       .append('<div id="inviteIsJoin">'+
                                  '<a href="#isJoinDialog" id="btnJoin" data-rel="popup"  data-transition="slideup" class="ui-btn ui-corner-all ui-shadow">參加</a>'+
                                  '<a href="#" id="btnNotJoin" class="ui-btn ui-corner-all ui-shadow">無法參加</a>'+
                              '</div>');
  }
  var clicked = false ;
  $("#renderCalendar").on("click",function(){
    if(clicked) {
      $("#renderCalendar").removeClass('ui-icon-minus').addClass('ui-icon-plus');
      clicked = false ;
    }else {
      $("#renderCalendar").removeClass('ui-icon-plus').addClass('ui-icon-minus');
      clicked = true ;
    }
    
  });

  initInviteCalendar(eventWrapper);
  //在addInviteCalendarEvent之前 先確認有沒有已經加入過此event了
  if(isEventDuplicate(eventWrapper.id)){
    setTimeout(function(){
      //因為在轉到下一頁時 會被reset , 所以等reset結束 再disable
      $( "#btnJoin" ).addClass('ui-disabled');
      }, 100);
    
  }
  renderCalendarClick();
  
}//End addInviteCalendarEventToCalendar
function initInviteCalendar(eventWrapper){
  delete eventWrapper.main;

  toAddEventObject = eventWrapper;

  
  /* 先detroy  */
  $("#inviteCalendar").hide();
  $('#inviteCalendar').fullCalendar('destroy');

  toAddEventObject.end = modifyCalendarDate(toAddEventObject.end);
  /* 再 init */
  $('#inviteCalendar').fullCalendar({
      theme: true,
      contentHeight: 360,
      header: {
        left: '',
        center: 'title',
        right: ''
      },
      eventColor: toAddEventObject.color,
      defaultDate: toAddEventObject.start,
      events: [
        {
          id: toAddEventObject.id,
          title: toAddEventObject.title,
          start: toAddEventObject.start,
          end: toAddEventObject.end
        }
      ]
    });
  //將已經加入工作日誌的event 也加到可能加入工作內
  $.each(EventSaved,function(index,value){
      $('#inviteCalendar').fullCalendar('renderEvent', value , true); 
  });
  
 
}//End initInviteCalendar
/* solve calendar date 少 1 的問題 */
function modifyCalendarDate(endDate) {
    var endDateArr = endDate.split("-");
    var date = new Date(endDateArr[0],endDateArr[1],endDateArr[2]);
    date.setMonth(date.getMonth()-1);
    date.setDate(date.getDate()+1);
    
    var newEndDate = moment(date).format("YYYY-MM-DD");
    return newEndDate;
}
function hideOrShowInviteCalendar(){
  //alert("renderCalendar");
  var isCalendarVisible = $("#inviteCalendar").is(":visible");
   
  if (isCalendarVisible) {
    $('#inviteCalendar').hide();
  }else {
    $('#inviteCalendar').show();
    $('#inviteCalendar').fullCalendar('render');
    $('#inviteCalendar').fullCalendar('rerenderEvents');
  }
}//End hideOrShowInviteCalendar
/*看有沒有重複的eventObject*/
function isEventDuplicate(newEventId) {

  var isEventDuplicateBool = false;
  /* 抓出所有在calendar中的eventObject */
  var allEventsArr  = $('#calendar').fullCalendar('clientEvents');
  /* 用id比對有沒有重複的eventObject */
  $.each( allEventsArr, function( index, value ) {
  
      if( value.id == newEventId){
        isEventDuplicateBool = true;
        // stop $.each
        return false; 
      }
  });
  return isEventDuplicateBool;
}

var discussionPage = {
    init : function () {
    //alert //console.log
        this.addEvent();
        this.collapsibleBehavior();
        this.discussStart();
    },
    addEvent : function(){
        //chooseGroupToTalkClick();
    },
    collapsibleBehavior : function() {

        $(document).on("pagecreate", "#discussion", function(){
          $(".animateMe .ui-collapsible-heading-toggle").on("click", function (e) { 
              var current = $(this).closest(".ui-collapsible");             
              if (current.hasClass("ui-collapsible-collapsed")) {
                  //collapse all others and then expand this one
                  $(".ui-collapsible").not(".ui-collapsible-collapsed").find(".ui-collapsible-heading-toggle").click(); 
                  $(".ui-collapsible-content", current).slideDown(300);
              } else {
                  $(".ui-collapsible-content", current).slideUp(300);
              }
           });
        });
    },
    discussStart : function(){
            $("#talk-button-submit").click(function(e) {
                if ( !isFirstSubmit ) {
                    fakeMessage();
                    isFirstSubmit = true;
                }

                var content = $("#talk-text-input").val();
                $("#talk-text-input").val("");

                $("#talkBox").append('</br><p style="color:blue">案件負責人-姚小明 : </p>'+
                                     '<p style="color:black">'+content+'</p>');
                //scroll to bottom
                scrollToBottom();
            });
    }
  
};
// function chooseGroupToTalkClick() {
//     $("#group a").click(function() {

//         $("#pleaseChooseP").remove();
//         $("#peopleInTalk").remove();
//         $("#talk-text-input").remove();

//         $("#typeBoxSecond").remove();
//         $("#talk-button-submit").remove();

//         $("#talkBox p").remove();  
//         $("#talkBox br").remove();  
        
        
//         var chooseGroup = $(this).text();
//         if( chooseGroup == "2056(W1) 3") {
//             isFirstSubmit = false;
//             //add peopleToTalk list
//             $("#peopleToTalk").append('<div id="peopleInTalk" data-role="collapsible" data-inset="true" data-iconpos="right" >'+
//                                         '<h3>群組人員</h3>'+
//                                         '<ol data-role="listview">'+
//                                           '<li data-icon="user"><a style="color:red;" href="#">評審員-汪小華</a></li>'+
//                                           '<li data-icon="user"><a style="color:green;" href="#">申請者-連大同</a></li>'+
//                                           '<li data-icon="user"><a style="color:blue;" href="#">案件負責人-姚小明</a></li>'+
//                                         '</ol>'+
//                                       '</div>').collapsibleset( "refresh" ).trigger("create");
  
//             $("#typeBox").append('<div id="typeBoxSecond"></div>');
//             $("#typeBoxSecond").append('<div data-role="content">'+   
//                                           '<div class="ui-grid-a">'+
//                                             '<div class="ui-block-a longdiv">'+
//                                               '<textarea style="height: 46px;"id="talk-text-input"></textarea>'+
//                                             '</div>'+
//                                             '<div class="ui-block-b shortdiv">'+
//                                               '<a href="#" id="talk-button-submit" class="ui-btn ui-shadow ui-corner-all ">送出</a>'+
//                                             '</div>'+
//                                           '</div>'+
//                                         '</div>');


//             $("#talk-text-input").textinput();       


//             $("#talk-text-input").val("關於NCR 問題不明白的地方請提出來討論。");
//             //要在anchor出現之後 才能夠bind submit click event
//             $("#talk-button-submit").click(function(e) {
//                 e.preventDefault();
//                 if ( !isFirstSubmit ) {
//                     fakeMessage();
//                     isFirstSubmit = true;
//                 }

//                 var content = $("#talk-text-input").val();
//                 $("#talk-text-input").val("");

//                 //discussArr.push(content);
//                 $("#talkBox").append('</br><p style="color:blue">案件負責人 : </p>'+
//                                      '<p style="color:black">'+content+'</p>');
//                 //scroll to bottom
//                 scrollToBottom();
//             });


//         } else {
//           $("#pleaseChoooseDiv").append('<p id="pleaseChooseP">請先選擇討論室</p>');
//           isFirstSubmit = false;
//         }


//     });
// }
function fakeMessage() {
    setTimeout(function(){
      $("#talkBox").append('</br><p style="color:green">申請者-連大同：</p>'+ 
                                '<p style="color:black">水泥混凝土粗細粒料比重及吸水率試驗。</p>');
      scrollToBottom(); 
    }, 3000);
    setTimeout(function(){
      $("#talkBox").append('</br><p style="color:red">評審員-汪小華：</p>'+
                                '<p style="color:black">水泥混凝土粗細粒料篩分析至少含CNS 13295之6.1外觀檢查、6.2尺度及許可差量測、6.3抗壓強度試驗及6.4吸水率試驗等4項。</p>') 
      scrollToBottom(); 
    }, 5000);
    setTimeout(function(){
      $("#talkBox").append('</br><p style="color:green">申請者-連大同：</p>'+
                                '<p style="color:black">我瞭解了。</p>')
      scrollToBottom(); 
    }, 7000);
    setTimeout(function(){
      $("#talkBox").append('</br><p style="color:blue">案件負責人-姚小明：</p>'+
                                 '<p style="color:black">如果資料還有不清楚的地方,隨時再提出來。</p>')
      scrollToBottom(); 
    }, 9000);
}
function scrollToBottom(){
    var divScrollHeight = $("#talkBox")[0].scrollHeight;              
    $("#talkBox").scrollTop(divScrollHeight);    
}


var downloadPage = {
    init : function () {
          this.addEvent();
          this.collapsibleBehavior();
    },
    addEvent : function () {
          downloadPanelClick();
    },
    collapsibleBehavior : function(){
          
      $(document).on("pagecreate", "#download", function(){
          $(".animateMe .ui-collapsible-heading-toggle").on("click", function (e) { 
              var current = $(this).closest(".ui-collapsible");             
              if (current.hasClass("ui-collapsible-collapsed")) {
                  //collapse all others and then expand this one
                  $(".ui-collapsible").not(".ui-collapsible-collapsed").find(".ui-collapsible-heading-toggle").click(); 
                  $(".ui-collapsible-content", current).slideDown(300);
              } else {
                  $(".ui-collapsible-content", current).slideUp(300);
              }
           });
        });
    }

};
function downloadPanelClick(){
    var fileName ;
    var fileSrc ;
    $("#fileListPanel a").on("click" , function (){
      fileName = $(this).attr("name");
    
      switch(fileName) {
          case "browseImage" :
              resetDownloadPage();
              browseLocalImageClick();
              break;
          case "browsePdf" :
              //resetDownloadPage();
              //browseLocalImageClick();
              break;
          case "TAF-PTP-B01" :
              resetDownloadPage();
              //fileSrc = "download/pdf/"+fileName+".pdf";
              fileSrc = "download/image/"+fileName+".png";
              showDownLoadFilePdf(fileSrc);
              break;
          case "TAF-CNLA-BI05(4)" :
              resetDownloadPage();
              //fileSrc = "download/pdf/"+fileName+".pdf";
              fileSrc = "download/image/"+fileName+".png";
              showDownLoadFilePdf(fileSrc);
              break;
          case "TAF-CNLA-BI01(5)" :
              resetDownloadPage();
              //fileSrc = "download/pdf/"+fileName+".pdf";
              fileSrc = "download/image/"+fileName+".png";
              showDownLoadFilePdf(fileSrc);
              break;
          case "TAF-CNLA-B05(5)" :
              resetDownloadPage();
              //fileSrc = "download/pdf/"+fileName+".pdf";
              fileSrc = "download/image/"+fileName+".png";
              showDownLoadFilePdf(fileSrc);
              break;
          default :
              //console.log("downloadPanelClick");
              resetDownloadPage();
      }
    });
}
// fake pdf(img)
function showDownLoadFilePdf(fileSrc) {
    $("#showDownloadFile").append('<div style="border:2px ;text-align:center;">'+
                                    '<img style="width:80%; height:400px;" src="'+fileSrc+'"/>'+
                                  '</div>');
}
// function showDownLoadFilePdf(fileSrc) {
//     $("#showDownloadFile").append('<div style="text-align:center;">'+
//                                           '<canvas name="'+fileSrc+'" id="canvasShowFile" style="border:1px solid black;width:80%;height:400px; "/>'+
//                                         '</div>');
//     PDFJS.getDocument(fileSrc).then(function(pdf) {
//         // Using promise to fetch the page
//         pdf.getPage(1).then(function(page) {

//         //
//         // Prepare canvas using PDF page dimensions
//         //
//         var canvas = document.getElementById("canvasShowFile");
//         var context = canvas.getContext('2d');

//         var scale = canvas.width / page.getViewport(1.0).width ;
//         var viewport = page.getViewport(scale);

//         canvas.height = viewport.height;

//         //
//         // Render PDF page into canvas context
//         //
//         var renderContext = {
//           canvasContext: context,
//           viewport: viewport
//         };
//         page.render(renderContext);
//       });
//     });
// }

// function showDownloadFileImage(fileSrc){
//   $('#showDownloadFile').append('<div style="text-align:center;""><a href="#'+fileSrc+'" name="thumbnailImage" data-rel="popup"'+
//   'data-position-to="window" data-transition="fade"><img class="popphoto"'+
//   'src="'+fileSrc+'" style="width:100%;height:300px"></a> </div>');//&nbsp;
// }
// function downloadPanelClick(){
//     $("#fileListPanel a").on("click" , function (){
//       var todo = $(this).attr("name");
//       alert(todo);
//       switch(todo) {
//           case "browseImage" :
//               resetDownloadPage();
//               browseLocalImageClick();
//               break;
//           case "browsePdf" :
//               resetDownloadPage();
//               browseLocalPdfClick();
//               break;
//           case "evaluation" :
//               resetDownloadPage();
//               //browseLocalImageClick();
//               break;
//           case "teach" :
//               resetDownloadPage();
//               //browseLocalImageClick();
//               break;
//           case "program" :
//               resetDownloadPage();
//               //browseLocalImageClick();
//               break;
//           default :
//               console.log("downloadPanelClick");
//               resetDownloadPage();
//       }
//     });
// }

// function browseLocalPdfClick() {
//     //alert("browser");
//     var pdfNameArr = [];
//     //get pdfs in local
//     $.ajax({
//         url:"download/pdf/",
//         success:function(result){
//             //alert("s");
//             $(result).find("a:contains(.pdf)").each(function(){
//             // will loop through 
//             var pdfs = $(this).attr("href");
//             //alert(pdfs);
//             pdfNameArr.push(pdfs);
           
//             });//end each
//             appendPdfThumbnailToView(pdfNameArr);
//         },
//         error:function(xhr,status,error){
//             alert("error : "+error);
//         }
//     });
// }
// function appendPdfThumbnailToView(pdfNameArr){
//     $.each(pdfNameArr,function(index,value) {
//           var pdfFullName = value;
//           var pdfName = pdfFullName.var endDateArr = endDate.split(".")[0];
//           var canvasName = "canvas"+pdfName;
//           //alert(pdfFullName+" : "+pdfName);

//           $("#showDownloadPdf").append('<div class="thumbnailImageCenter" style="display:inline;">'+
//                                           '<canvas name="'+pdfFullName+'" id="'+canvasName+'" style="border:1px solid black;width:30%;height:200px"/>'+
//                                         '</div>');
//           //$("#"+canvasName).on("click",pdfThumbnailClick);

//           getLocalPdfAndDisplay(pdfFullName,canvasName);
//     });
//     pdfThumbnailClick();   
// }
// function getLocalPdfAndDisplay(pdfFullName,canvasName) {
//         PDFJS.getDocument('download/pdf/'+pdfFullName+'').then(function(pdf) {
//         // Using promise to fetch the page
//         pdf.getPage(1).then(function(page) {

//         //
//         // Prepare canvas using PDF page dimensions
//         //
//         var canvas = document.getElementById(canvasName);
//         var context = canvas.getContext('2d');

//         var scale = canvas.width / page.getViewport(1.0).width ;
//         var viewport = page.getViewport(scale);
//         canvas.height = viewport.height;

//         //
//         // Render PDF page into canvas context
//         //
//         var renderContext = {
//           canvasContext: context,
//           viewport: viewport
//         };
//         page.render(renderContext);
//       });
//     });
// }
// function pdfThumbnailClick() {
//     $("#showDownloadPdf canvas").on("click",function(){
//         var pdfFullName = $(this).attr("name");
//         $(":mobile-pagecontainer").pagecontainer("change", "#viewPdf", { 
//             transition: 'flow'
//         });
//         showPdf(pdfFullName);
//     });
// }
// function showPdf(pdfFullName){
//   // Disable workers to avoid yet another cross-origin issue (workers need the URL of
//     // the script to be loaded, and currently do not allow cross-origin scripts)    
//     //PDFJS.disableWorker = true;
//     var pdfDoc = null,
//         pageNum = 1,
//         pageRendering = false,
//         pageNumPending = null,
//         scale = 0.8,
//         canvas = document.getElementById('the-canvas'),
//         ctx = canvas.getContext('2d');

//     var url = 'download/pdf/'+pdfFullName;
//     /**
//      * Asynchronously downloads PDF.
//      */
//     PDFJS.getDocument(url).then(function (pdf) {
//       pdfDoc = pdf;
//       $("#page_count").text(pdfDoc.numPages);
//       // Initial/first page rendering
//       renderPage(pageNum);
//     });
    
//     /**
//      * Get page info from document, resize canvas accordingly, and render page.
//      * @param num Page number.
//      */
//     function renderPage(num) {
//       pageRendering = true;
//       // Using promise to fetch the page
//       pdfDoc.getPage(num).then(function(page) {
//         var viewport = page.getViewport(scale);
//         canvas.height = viewport.height;
//         canvas.width = viewport.width;

//         // Render PDF page into canvas context
//         var renderContext = {
//           canvasContext: ctx,
//           viewport: viewport
//         };
//         var renderTask = page.render(renderContext);
        
//         // Wait for rendering to finish
//         renderTask.promise.then(function () {
//           pageRendering = false;
//           if (pageNumPending !== null) {
//             // New page rendering is pending
//             renderPage(pageNumPending);
//             pageNumPending = null;
//           }
//         });
//       });
//       // Update page counters
//       $("#page_num").text(pageNum);
//     }
    
//     /**
//      * If another page rendering in progress, waits until the rendering is
//      * finised. Otherwise, executes rendering immediately.
//      */
//     function queueRenderPage(num) {
//       if (pageRendering) {
//         pageNumPending = num;
//       } else {
//         renderPage(num);
//       }
//     }
//     /*** Displays previous page.*/    
//     $("#prev").click(function(){
//         if (pageNum <= 1) {
//           return;
//         }
//         pageNum--;
//         queueRenderPage(pageNum);
//     });
//     /** Displays next page. **/
//     $("#next").click(function() {
//         if (pageNum >= pdfDoc.numPages) {
//           return;
//         }
//         pageNum++;
//         queueRenderPage(pageNum);
//     });
// }
function resetDownloadPage() {
    $("#showDownloadImage div").remove();
    $("#showDownloadPdf div").remove();
    $("#showDownloadFile div").remove();
}




/******************* start ********************/
app.init(); 
















//
