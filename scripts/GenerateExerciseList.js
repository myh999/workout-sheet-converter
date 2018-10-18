const fs = require('fs');
const inputPath = '../SampleOutput/Image1jpgText.txt'
const outputPath = '../SampleOutput/Image1ExerciseList.txt'
var text = fs.readFileSync(inputPath).toString('utf-8');
var textSplit = text.split(' ');
console.log(textSplit);