// import { jsPDF } from "./jspdf.umd.min.js";
window.jsPDF = window.jspdf.jsPDF;
function imprimirPDF() {
  var pdf = new jsPDF("p", "pt", "letter");
  pdf.html(document.body, {
    callback: function (pdf) {
      var iframe = document.createElement("iframe");
      iframe.setAttribute(
        "style",
        "position:absolute;right:0; top:0; bottom:0; height:100%; width:500px"
      );
      document.body.appendChild(iframe);
      iframe.src = pdf.output("datauristring");
    },
  });
}
