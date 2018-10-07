var PDFImage = require("pdf-image").PDFImage;

var pdfImage = new PDFImage("SampleImages/Image1.pdf", {
    convertOptions: {
        "-quality": "100"
    }
});
pdfImage.convertPage(0).then(function(imagePath) {
    fs.existsSync("SampleImages/Image1-0.png");
    console.log("Conversion Successful");
});
