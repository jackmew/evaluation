$(document).ready(function(){
	console.log("ready");
});

$(document).on("pagecreate", "#pageWithListview", function(){
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