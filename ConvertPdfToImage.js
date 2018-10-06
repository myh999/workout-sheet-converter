const pdf = require('pdf-poppler');
const path = require('path');

let sampleFile = 'SampleImages\\Image1.pdf';
let file = sampleFile;
let options = {
    format: 'jpeg',
    out_dir: path.dirname(file),
    out_prefix: path.basename(file, path.extname(file)),
    page: 1
};

pdf.convert(file, options).then(res => {
    console.log('PDF Converstion Successful');
}).catch(error => {
    console.error(error);
});