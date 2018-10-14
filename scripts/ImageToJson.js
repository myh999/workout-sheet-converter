const vision = require('@google-cloud/vision');
const fs = require('fs');

const client = new vision.ImageAnnotatorClient();
const fileName = '../SampleImages/Image1.jpg';
const outName = '../SampleOutput/Image1jpgResults2.json'

var result = '';

client.textDetection(fileName).then(results => {
    const detections = results[0].fullTextAnnotation;
    const data = JSON.stringify(detections);
    const json = JSON.parse(data);
    fs.writeFile(outName, data, err => {
        if (err) throw err;
        console.log("File saved to: " + outName);
    })
}).catch(error => {
    console.error('ERROR:', error);
});
