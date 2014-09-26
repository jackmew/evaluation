/*
$(document).ready(function(){
	alert("ready");
});

//以下兩個event的觸發時間點都是在 -> "已經"轉換到下一頁

$(document).on("pagecontainerhide", function(e,ui){
	alert("pagecontainerhide :"+ui.nextPage[0].id);
});
$(document).on("pagecontainershow", function(e,ui){
	//因為第一頁進入時 會不存在前一頁 就會出現undefined error
	if(typeof ui.prevPage[0] !== "undefined"){
		alert("pagecontainershow -> previous page:"+ui.prevPage[0].id);
	}
});

//以下兩個event的觸發時間點都是在 -> 轉換到下一個頁面"之前"

$(document).on("pagecontainerbeforehide", function(e,ui){
	
	alert("pagecontainerbeforehide -> Next page :"+ui.nextPage[0].id);
	
});
$(document).on("pagecontainerbeforeshow", function(e,ui){
	//因為第一頁進入時 會不存在前一頁 就會出現undefined error
	if(typeof ui.prevPage[0] !== "undefined"){
		alert("pagecontainerbeforeshow -> previous page:"+ui.prevPage[0].id);
	}
});

//pagebeforechange 會觸發兩次

$(document).on("pagebeforechange",function(e,ui){
	alert("pagebeforechange :"+ui.toPage[0].id);
});

//指定 某 page , 當某page crete 時 又呼叫我

$(document).on("pagecreate", "[data-role=page]" , function(e){
	alert("pagecreate :"+e);
});

//用來override global setting

$(document).one("mobileinit", function(){
        alert("mobile ready!");
        //jquery mobile configuration
        $.extend( $.mobile , {
            defaultPageTransition: "slide"
        });
});
*/
