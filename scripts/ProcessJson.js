const fs = require('fs');
const filePath = '../SampleOutput/Image1jpgResults.json';
const outputPath = '../SampleOutput/Image1jpgText.txt';

var results;

fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
        console.log(err.stack);
        throw err;
    };
    results = JSON.parse(data);
    text = results.text;
    fs.writeFile(outputPath, text, err => {
        if (err) throw err;
        console.log('Done');
    });
});