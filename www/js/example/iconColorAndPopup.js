$(function(){
	$("#showImage").on("click",showImageClick);
});

function showImageClick(){
	var imageNameArr = [];
    //get images in local
    $.ajax({
        url:"../download/image/",
        success:function(result){
            // console.log(result);
            $(result).find("a:contains(.jpg)").each(function(){
            // will loop through 
            var images = $(this).attr("href");
            imageNameArr.push(images);
            });//end each
            //console.log(imageNameArr);
            appendImageToView(imageNameArr);
        },
        error:function(xhr,status,error){
            alert("error : "+error);
        }
    });
}

function appendImageToView(imageNameArr){
    $.each(imageNameArr,function(index,value) {
        var imageFullName = value;
        var imageNameSplit = value.split(".");
        var imageName = imageNameSplit[0];
        var imageHref = "popup"+imageName;
        //alert(imageHref);
    
        $('#showDownloadImage').append('<div class="thumbnailImageCenter" style="display:inline"><a href="#'+imageHref+'" name="thumbnailImage" data-rel="popup"'+
          'data-position-to="window" data-transition="fade"><img class=""'+
          'src="../download/image/'+imageFullName+'" style="width:20%;height:200px"></a> </div>');//&nbsp;

    });
    //dynamic create popup , 縮圖 變大圖
    dynamicCreatePopupShowImage(); 
}
function dynamicCreatePopupShowImage() {
    $("a[name='thumbnailImage']").on("click",function() {
      
      var target = $(this);
      var targetSrc = target.children().attr("src");
      //console.log(targetSrc);
      var imageFullName = targetSrc.split("/")[2];
      var imageName = imageFullName.split(".")[0];
      //alert(imageName);
      //create popup
      var $popUp = $("<div/>").popup({
          //dismissible: false,
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
          //"data-right" : "true"
      }).addClass("ui-btn-right").appendTo($popUp);
      /*image*/
      $("<img>",{
          text: "try image"
      }).attr("src",targetSrc)
      .attr("alt",imageName)
      .appendTo($popUp);

      $popUp.popup('open').trigger("create");
    });
}