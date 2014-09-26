$(function(){
	$("#showPdf").on("click",showPdfClick);
});

function showPdfClick(){
	//alert("browser");
    var pdfNameArr = [];
    //get pdfs in local
    $.ajax({
        url:"../download/pdf/",
        success:function(result){
            console.log(result);
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
          //alert(value);
          var pdfFullName = value;
          var pdfName = pdfFullName.split(".")[0];
          //var pdfName = nameArr[0];
          //var pdfName = pdfFullName.var endDateArr = endDate.split(".")[0];
          var canvasName = "canvas_"+pdfName;
          //alert(canvasName+" : "+canvasName);

          $("#showDownloadPdf").append('<div class="thumbnailPdfCenter" style="display:inline;">'+
                                          '<canvas name="'+pdfFullName+'" id="'+canvasName+'" style="border:1px solid black;width:30%;height:200px"/>'+
                                        '</div>');
          //$("#"+canvasName).on("click",pdfThumbnailClick);

          getLocalPdfAndDisplay(pdfFullName,canvasName);
    });
    pdfThumbnailClick();   
}
function getLocalPdfAndDisplay(pdfFullName,canvasName) {
        PDFJS.getDocument('../download/pdf/'+pdfFullName+'').then(function(pdf) {
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
        //http://stackoverflow.com/questions/19174611/how-to-change-page-in-latest-jquery-mobile-1-4-beta
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

    var url = '../download/pdf/'+pdfFullName;
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