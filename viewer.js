var url = '/ziyakhala_cropped.pdf';

var pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.min.js';

function isMobileDevice() {
  return window.innerWidth <= 768;
}

pdfjsLib.getDocument(url).promise.then(function(pdf) {
  pdf.getPage(1).then(function(page) {
    var viewportAtScale1 = page.getViewport({ scale: 1 });

    var scale;

    if (isMobileDevice()) {
      var desiredHeight = window.innerHeight * 0.95;
      scale = desiredHeight / viewportAtScale1.height;
    } else {
      var maxWidth = 750;
      var desiredWidth = Math.min(window.innerWidth * 0.9, maxWidth);
      scale = desiredWidth / viewportAtScale1.width;
    }

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      pdf.getPage(pageNumber).then(function(page) {
        var viewport = page.getViewport({ scale: scale });

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        canvas.style.width = "100%";
        canvas.style.height = "auto";
        canvas.style.display = "block";
        canvas.style.margin = "0 auto 20px";
        canvas.style.backgroundColor = "white";

        var viewer = document.getElementById('viewer');
        viewer.appendChild(canvas);

        page.render({
          canvasContext: context,
          viewport: viewport
        });
      });
    }
  });
});
