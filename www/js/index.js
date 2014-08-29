function documentReadyEvent(deviceReadyDeferred,jqmReadyDeferred) {
    $(document).ready(function(){
        console.log( "DOM ready!" );
        //$.when(deviceReadyDeferred, jqmReadyDeferred).then(app.allReady);
        app.allReady();
    });
}
// function deviceReadyEvent(deviceReadyDeferred) {
//     document.addEventListener("deviceReady", function(){
//         console.log("device ready!");
//         deviceReadyDeferred.resolve();
//     }, false);
// }
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
    },
    addEvent : function() {
        documentReadyEvent(this.deviceReadyDeferred,this.jqmReadyDeferred);
        //deviceReadyEvent(this.deviceReadyDeferred);
        jqueryMobileReadyEvent(this.jqmReadyDeferred);
    }
    ,
    allReady : function() {
        console.log("all ready");

        setGlobalVariable();
    
        pageManager.init();
       
        homePage.init();

        contactPage.init();

        systemMessagePage.init();

        discussionPage.init();

        downloadPage.init();
    }

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
  /******* System Message *******/
  toAddEventObject = {};


  messageArr = [];

  message1 = new Message('1', '評鑑邀請','1125(W1)','2014/08/25' , '10:24',true,true);
  message2 = new Message('2', 'NC445改善','2498(W3)','2014/08/26' , '11:10',true,false);
  message3 = new Message('3', 'NC4改善','3398(W6)','2014/08/25' , '12:35',false,true);
  message4 = new Message('4', '評鑑邀請','1130(W2)','2014/08/25' , '13:35',true,false);
  message5 = new Message('5', 'NCffR改善','1248(W4)','2014/08/26' , '08:00',false,false);
  message6 = new Message('6', 'NCRxx改善','1258(W5)','2014/09/25' , '09:00',false,false);

  messageArr.push(message1);
  messageArr.push(message2);
  messageArr.push(message3);
  messageArr.push(message4);
  messageArr.push(message5);
  messageArr.push(message6);

  /******* Discussion *******/
  isFirstSubmit = false;
}

var pageManager = {
    init : function () {
        this.addEvent();
    },
    addEvent : function () {
        var pagemanager = this ;
        $( document ).on( "pagecontainerbeforeshow" , function(e, ui) {
            pagemanager.resetPage();
        });
        /* this is for detect what next page is  */
        $( document ).on( "pagecontainerbeforehide" ,function(e, data) {
            console.log("Next Page : "+data.nextPage[0].id);
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
        $('#calendar').hide();
        /* system message */
        $( "#btnJoin" ).removeClass('ui-disabled');
        /* discussion */
        $("#talkBox p").remove();
        isFirstSubmit = false;
        /* download */
        $("#showDownloadImage div").remove();
        $("#showDownloadPdf div").remove();
    }
}




var homePage = {
    init : function () {
      initYourCalendar();
      this.addEvent();
    },
    addEvent: function () {
      $("#btnCalendar").on("click", hideOrShowCalendar);

      $("#addCalendarEvent").on("click",addCalendarEvent);

      $("#removeCalendarEvent").on("click",removeCalendarEvent);

      $("#getAllCalendarEvents").on("click",getAllCalendarEvents);
    } 
};
function initYourCalendar() {
  $('#calendar').fullCalendar({
      theme: true,
      header: {
        left: 'prev,today,next ',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },

      defaultDate: '2014-08-12',
      editable: true,
      eventLimit: true
      
    });
}
function addCalendarEvent(){
  console.log("addCalendarEvent");
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
  $('#calendar').fullCalendar('renderEvent', eventDate, true); // stick? = true
  
}//End addCalendarEvent
function removeCalendarEvent() {
  console.log("removeCalendarEvent");

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
      renderCalendarClick();
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
            console.log(index);
            var date = index;
            var type = aSet.name;
            console.log(type);

            setListDivider(date,type);
            //setListView(date,type);
          }
      });
    }//End iterateSet 

    
    function setListDivider(date,type) {
      console.log("setListDivider");
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
              console.log("setListView");
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
        //alert(evaluationName);
        addInviteCalendarEvent(evaluationName);
  });
}//End systemMessageToCalendar
function renderCalendarClick(){
  $("#renderCalendar").on("click",hideOrShowInviteCalendar);
}
function sureJoinClick() {
  $("#sureJoin").click(function() {
      setTimeout(function(){
        /* 將這個事件 加入行事曆中*/
        $('#calendar').fullCalendar('renderEvent', toAddEventObject, true); // stick? = true
        
        /* refresh inviteCalendar*/
        //$('#calendar').fullCalendar('render');
        /* 顯示 已加入行事曆 訊息 */
        $("#popupBasic-joined").popup( "open" );
        /* 參加 button disable */
        $( "#btnJoin" ).addClass('ui-disabled');
        

      }, 1000);
      
    }); 
}
function addInviteCalendarEvent(evaluationName) {

  var eventWrapper;
  switch(evaluationName) {
    case "1125(W1)" :
        eventWrapper = {
          id: 1125,
          title: evaluationName, 
          start: "2014-09-01",
          end: "2014-09-12",
          color: "blue"
        };
        addInviteCalendarEventToCalendar(eventWrapper);
        break;
    case "1130(W2)" :
        eventWrapper = {
          id: 1130,
          title: evaluationName, 
          start: "2014-09-14",
          end: "2014-09-21",
          color: "green"
        };
        addInviteCalendarEventToCalendar(eventWrapper);
        break;
    case "1248(W4)" :
        eventWrapper = {
          id: 1248,
          title: evaluationName, 
          start: "2014-10-14",
          end: "2014-10-22",
          color: "pink"
        };
        addInviteCalendarEventToCalendar(eventWrapper);
        break;
    case "1258(W5)" :
        eventWrapper = {
          id: 1258,
          title: evaluationName, 
          start: "2014-10-25",
          end: "2014-10-30",
          color: "red"
        };
        addInviteCalendarEventToCalendar(eventWrapper);
        break;
    case "2498(W3)" :
        eventWrapper = {
          id: 2498,
          title: evaluationName, 
          start: "2014-11-21",
          end: "2014-11-27",
          color: "brown"
        };
        addInviteCalendarEventToCalendar(eventWrapper);
        break;
    case "3398(W6)" :
        eventWrapper = {
          id: 3398,
          title: evaluationName, 
          start: "2014-11-05",
          end: "2014-11-15",
          color: "purple"
        };
        addInviteCalendarEventToCalendar(eventWrapper);
        break;
    default:     
        console.log("do nothing");
  }//End switch 
}//End addInviteCalendarEvenvar
function addInviteCalendarEventToCalendar(eventWrapper){
  initInviteCalendar(eventWrapper);
  //在addInviteCalendarEvent之前 先確認有沒有已經加入過此event了
  if(isEventDuplicate(eventWrapper.id)){
    setTimeout(function(){
      //因為在轉到下一頁時 會被reset , 所以等reset結束 再disable
      $( "#btnJoin" ).addClass('ui-disabled');
      }, 100);
    
  }
  /*改變invite message*/
  $("#inviteMessage p").text("邀請XXX委員參與"+eventWrapper.title+"溫室氣體認證,評鑑期間"+eventWrapper.start+"~"+eventWrapper.end+",請回覆可否參加:");
}//End addInviteCalendarEventToCalendar
function initInviteCalendar(eventWrapper){
  toAddEventObject = eventWrapper
  /* 先detroy  */
  $("#inviteCalendar").hide();
  $('#inviteCalendar').fullCalendar('destroy');
  /* 再 init */
  $('#inviteCalendar').fullCalendar({
      theme: true,
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
}//End initInviteCalendar
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
        this.addEvent();
    },
    addEvent : function(){
        chooseGroupToTalkClick();
    }
};
function chooseGroupToTalkClick() {
    $("#group a").click(function() {

        $("#pleaseChooseP").remove();
        $("#peopleInTalk").remove();
        $("#talk-text-input").remove();
        $("#talk-button-submit").remove();  
        $("#talkBox p").remove();  

        
        var chooseGroup = $(this).text();
        if( chooseGroup == "2056(W1) 3") {
            //add peopleToTalk list
            $("#peopleToTalk").append('<div id="peopleInTalk" data-role="collapsible" data-inset="true" data-iconpos="right" >'+
                                        '<h3>討論中</h3>'+
                                        '<ol data-role="listview">'+
                                          '<li data-icon="user"><a href="#">你 </a></li>'+
                                          '<li data-icon="user"><a href="#">楊一 </a></li>'+
                                          '<li data-icon="user"><a href="#">楊二 </a></li>'+
                                        '</ol>'+
                                      '</div>').collapsibleset( "refresh" ).trigger("create");
            //add talkBox textarea
            // $("#talkBox").append('<textarea cols="50" rows="10" name="textarea" id="talk-textarea-content"></textarea>');
            // $("#talk-textarea-content").textinput();

            //add typeBox input
            $("#typeBox").append('<input type="text" name="text-basic" id="talk-text-input" value="">'+
                                 '<a href="#" id="talk-button-submit" class="ui-btn ui-shadow ui-corner-all ui-icon-edit ui-btn-icon-top"></a>');
            $("#talk-text-input").textinput();            
          
            //要在anchor出現之後 才能夠bind submit click event
            $("#talk-button-submit").click(function(e) {
                e.preventDefault();
                if ( !isFirstSubmit ) {
                    fakeMessage();
                    isFirstSubmit = true;
                }

                var content = $("#talk-text-input").val();
                $("#talk-text-input").val("");

                //discussArr.push(content);
                $("#talkBox").append('<p>你 : '+content+'</p>');
                //scroll to bottom
                var divScrollHeight = $("#talkBox")[0].scrollHeight;              
                $("#talkBox").scrollTop(divScrollHeight);    
            });


        } else {
          $("#pleaseChoooseDiv").append('<p id="pleaseChooseP">請先選擇討論室</p>');
        }


    });
}
function fakeMessage() {
    setTimeout(function(){$("#talkBox").append('<p>楊一 : 你好</p>') 
    }, 3000);
    setTimeout(function(){$("#talkBox").append('<p>楊二 : 你好呀</p>') 
    }, 5000);
    setTimeout(function(){$("#talkBox").append('<p>楊一 : 我們來討論XXX</p>')
    }, 7000);
    setTimeout(function(){$("#talkBox").append('<p>楊二 : 可是你是笨蛋</p>')
    }, 9000);
    setTimeout(function(){$("#talkBox").append('<p>楊一 : ......</p>')
    }, 10000);
    setTimeout(function(){$("#talkBox").append('<p>楊二 : 不理你 掰</p>')
    }, 12000);
}


var downloadPage = {
    init : function () {
          this.addEvent();
    },
    addEvent : function () {
          downloadPanelClick();
    }

};
function downloadPanelClick(){
    $("#fileListPanel a").on("click" , function (){
      var todo = $(this).attr("name");
      //alert(todo);
      switch(todo) {
          case "browseImage" :
              resetDownloadPage();
              browseLocalImageClick();
              break;
          case "browsePdf" :
              resetDownloadPage();
              browseLocalPdfClick();
              break;
          case "evaluation" :
              resetDownloadPage();
              //browseLocalImageClick();
              break;
          case "teach" :
              resetDownloadPage();
              //browseLocalImageClick();
              break;
          case "program" :
              resetDownloadPage();
              //browseLocalImageClick();
              break;
          default :
              console.log("downloadPanelClick");
              resetDownloadPage();
      }
    });
}
function browseLocalImageClick() {
    //alert("browser");
    var imageNameArr = [];
    //get images in local
    $.ajax({
        url:"download/image/",
        success:function(result){
            //alert("s");
            $(result).find("a:contains(.jpg)").each(function(){
            // will loop through 
            var images = $(this).attr("href");
            imageNameArr.push(images);
           
            });//end each
            appendImageToView(imageNameArr);
        },
        error:function(xhr,status,error){
            alert("error : "+error);
        }
    });
    
}
/*************** 點開已下載 image browse *****************/
function appendImageToView(imageNameArr){
    $.each(imageNameArr,function(index,value) {
        var imageFullName = value;
        var imageNameSplit = value.split(".");
        var imageName = imageNameSplit[0];
        var imageHref = "popup"+imageName;
        //alert(imageHref);
    
        $('#showDownloadImage').append('<div class="thumbnailImageCenter" style="display:inline"><a href="#'+imageHref+'" name="thumbnailImage" data-rel="popup"'+
          'data-position-to="window" data-transition="fade"><img class="popphoto"'+
          'src="download/image/'+imageFullName+'" style="width:30%;height:100px"></a> </div>');//&nbsp;

    });
    //dynamic create popup , 縮圖 變大圖
    dynamicCreatePopupShowImage();
    
}
function dynamicCreatePopupShowImage() {
    $("a[name='thumbnailImage']").on("click",function() {
      
      var target = $(this);
      var targetSrc = target.children().attr("src");
      //alert(targetSrc);
      var imageFullName = targetSrc.split("/")[2];
      var imageName = imageFullName.split(".")[0];
      //alert(imageName);
      //create popup
      var $popUp = $("<div/>").popup({
          dismissible: false,
          theme: "b",
          transition: "pop"
      }).on("popupafterclose", function () {
          //remove the popup when closing
          $(this).remove();
      }).css({
          'width': '100%',
          'height': '300px',
          'padding-left': '2px',
          'padding-top': '2px',
          'padding-bottom': '2px'
      });
      /*right top close button*/
      $("<a>", {
          text: "try",
          "data-rel": "back"
      }).buttonMarkup({
          iconpos: "notext",
          icon: "delete",
          "data-right" : "true"
      }).addClass("ui-btn-right").appendTo($popUp);
      /*image*/
      $("<img>",{
          text: "try image"
      }).addClass("popphoto")
      .attr("src",targetSrc)
      .attr("alt",imageName)
      .appendTo($popUp);

      $popUp.popup('open').trigger("create");
    });
}
function browseLocalPdfClick() {
    //alert("browser");
    var pdfNameArr = [];
    //get pdfs in local
    $.ajax({
        url:"download/pdf/",
        success:function(result){
            //alert("s");
            $(result).find("a:contains(.pdf)").each(function(){
            // will loop through 
            var pdfs = $(this).attr("href");
            //alert(pdfs);
            pdfNameArr.push(pdfs);
           
            });//end each
            appendPdfThumbnailToView(pdfNameArr);
        },
        error:function(xhr,status,error){
            alert("error : "+error);
        }
    });
}
function appendPdfThumbnailToView(pdfNameArr){
    $.each(pdfNameArr,function(index,value) {
          var pdfFullName = value;
          var pdfName = pdfFullName.split(".")[0];
          var canvasName = "canvas"+pdfName;
          //alert(pdfFullName+" : "+pdfName);

          $("#showDownloadPdf").append('<div class="thumbnailImageCenter" style="display:inline;">'+
                                          '<canvas name="'+pdfFullName+'" id="'+canvasName+'" style="border:1px solid black;width:30%;height:200px"/>'+
                                        '</div>');
          //$("#"+canvasName).on("click",pdfThumbnailClick);

          getLocalPdfAndDisplay(pdfFullName,canvasName);
    });
    pdfThumbnailClick();
      
}
function getLocalPdfAndDisplay(pdfFullName,canvasName) {
        PDFJS.getDocument('download/pdf/'+pdfFullName+'').then(function(pdf) {
        // Using promise to fetch the page
        pdf.getPage(1).then(function(page) {

        //
        // Prepare canvas using PDF page dimensions
        //
        var canvas = document.getElementById(canvasName);
        var context = canvas.getContext('2d');

        var scale = canvas.width / page.getViewport(1.0).width ;
        var viewport = page.getViewport(scale);
        canvas.height = viewport.height;

        //
        // Render PDF page into canvas context
        //
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);
      });
    });
}
function pdfThumbnailClick() {
    $("#showDownloadPdf canvas").on("click",function(){
        var pdfFullName = $(this).attr("name");
        $(":mobile-pagecontainer").pagecontainer("change", "#viewPdf", { 
            transition: 'flow'
        });
        showPdf(pdfFullName);
    });
    
}
function showPdf(pdfFullName){
  // Disable workers to avoid yet another cross-origin issue (workers need the URL of
    // the script to be loaded, and currently do not allow cross-origin scripts)    
    //PDFJS.disableWorker = true;
    var pdfDoc = null,
        pageNum = 1,
        pageRendering = false,
        pageNumPending = null,
        scale = 0.8,
        canvas = document.getElementById('the-canvas'),
        ctx = canvas.getContext('2d');

    var url = 'download/pdf/'+pdfFullName;
    /**
     * Asynchronously downloads PDF.
     */
    PDFJS.getDocument(url).then(function (pdf) {
      pdfDoc = pdf;
      $("#page_count").text(pdfDoc.numPages);
      // Initial/first page rendering
      renderPage(pageNum);
    });
    
    /**
     * Get page info from document, resize canvas accordingly, and render page.
     * @param num Page number.
     */
    function renderPage(num) {
      pageRendering = true;
      // Using promise to fetch the page
      pdfDoc.getPage(num).then(function(page) {
        var viewport = page.getViewport(scale);
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        
        // Wait for rendering to finish
        renderTask.promise.then(function () {
          pageRendering = false;
          if (pageNumPending !== null) {
            // New page rendering is pending
            renderPage(pageNumPending);
            pageNumPending = null;
          }
        });
      });
      // Update page counters
      $("#page_num").text(pageNum);
    }
    
    /**
     * If another page rendering in progress, waits until the rendering is
     * finised. Otherwise, executes rendering immediately.
     */
    function queueRenderPage(num) {
      if (pageRendering) {
        pageNumPending = num;
      } else {
        renderPage(num);
      }
    }
    /*** Displays previous page.*/    
    $("#prev").click(function(){
        if (pageNum <= 1) {
          return;
        }
        pageNum--;
        queueRenderPage(pageNum);
    });
    /** Displays next page. **/
    $("#next").click(function() {
        if (pageNum >= pdfDoc.numPages) {
          return;
        }
        pageNum++;
        queueRenderPage(pageNum);
    });
}
function resetDownloadPage() {
    $("#showDownloadImage div").remove();
    $("#showDownloadPdf div").remove();
}




/******************* start ********************/
app.init(); 
















//
