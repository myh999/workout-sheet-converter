const fs = require('fs');
const deepcopy = require('deepcopy');
const path = require('path');
const coordinatesHelper = require('./CoordinatesHelper');

const appDir = path.dirname(require.main.filename);
const filePath = appDir + '/../SampleOutput/Image1jpgResults3.json';

const content = fs.readFileSync(filePath);
const textJson = JSON.parse(content);

initLineSegmentation(textJson);

function initLineSegmentation(data) {
    const yMax = coordinatesHelper.getYMax(data);
    data = coordinatesHelper.invertAxis(data, yMax);

    let lines = data.textAnnotations[0].description.split('\n');
    let rawText = deepcopy(data.textAnnotations);

    lines = lines.reverse();
    rawText = rawText.reverse();
    rawText.pop();

    let mergedArray = getMergedLines(lines, rawText);

}

function getMergedLines(lines, rawText) {
    let mergedArray = [];
    while (lines.length !== 1) {
        let line = lines.pop();
        let lineCopy = deepcopy(line);
        let isStart = true;

        let data = "";
        let mergedElement;
        let wordElement;

        do {
            wordElement = rawText.pop();
            if (wordElement !== undefined) {
                let word = wordElement.description;
                let index = line.indexOf(word);
                line = line.substring(index + word.length);
                if (isStart) {
                    isStart = false;
                    // Get coordinates of first word
                    mergedElement = wordElement;
                }
            }
        } while (wordElement !== undefined && line !== "");

        // Get coordinates of last word
        if (line === "") {
            mergedElement.description = lineCopy;
            mergedElement.boundingPoly.vertices[1] = wordElement.boundingPoly.vertices[1];
            mergedElement.boundingPoly.vertices[2] = wordElement.boundingPoly.vertices[2];
            mergedArray.push(mergedElement);
        }
    }
    return mergedArray;
}
