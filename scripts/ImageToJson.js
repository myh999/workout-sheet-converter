const vision = require('@google-cloud/vision');
const fs = require('fs');

const client = new vision.ImageAnnotatorClient();
const fileName = '../SampleImages/Image1.jpg';
const outName = '../SampleOutput/Image1jpgResults3.json'

var result = '';

client.textDetection(fileName).then(results => {
    const detections = results;
    fs.writeFile(outName, results, err => {
        if (err) throw err;
        let data = results[0];
        console.log(data);
        fs.writeFileSync(outName, JSON.stringify(data));
        console.log("File saved to: " + outName);
    })
}).catch(error => {
    console.error('ERROR:', error);
});
