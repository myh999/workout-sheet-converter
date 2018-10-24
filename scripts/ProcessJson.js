const fs = require('fs');
const deepcopy = require('deepcopy');
const coordinatesHelper = require('./CoordinatesHelper');

const filePath = '../SampleOutput/Image1jpgResults3.json';

const content = fs.readFileSync(filePath);
const textJson = JSON.parse(content);

initLineSegmentation(textJson);

function initLineSegmentation(data) {
    const yMax = coordinatesHelper.getYMax(data);
    console.log("YMax: " + yMax);
    
}
