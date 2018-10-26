const inside = require('point-in-polygon');
const deepcopy = require('deepcopy');

function getYMax(data) {
    let vertices = data.textAnnotations[0].boundingPoly.vertices;
    let yArray = [];
    for (let i = 0; i < 4; i++) {
        yArray.push(vertices[i]['y']);
    }
    return Math.max.apply(null, yArray);
}

function invertAxis(data, yMax) {
    data = fillMissingValues(data);
    for (let i = 1; i < data.textAnnotations.length; i++) {
        let vertices = data.textAnnotations[i].boundingPoly.vertices;
        for (let j = 0; j < 4; j++) {
            vertices[j]['y'] = (yMax - vertices[j]['y']);
        }
    }
    return data;
}

function fillMissingValues(data) {
    for (let i = 1; i < data.textAnnotations.length; i++) {
        let vertices = data.textAnnotations[i].boundingPoly.vertices;
        vertices.map((vertex) => {
            if (vertex['x'] === undefined) {
                vertex['x'] = 0;
            }
            if (vertex['y'] === undefined) {
                vertex['y'] = 0;
            }
        });
    }
    return data;
}

function getBoundingPolygon(mergedArray) {
    for (let i = 0; i < mergedArray.length; i++) {
        let array = [];

        let height1 = mergedArray[i].boundingPoly.vertices[0].y - mergedArray[i].boundingPoly.vertices[3].y;
        let height2 = mergedArray[i].boundingPoly.vertices[1].y - mergedArray[i].boundingPoly.vertices[2].y;
        let height = height1;
        if (height2 > height1) {
            height = height2;
        }
        let avgHeight = h * 0.6;
        
        array.push(mergedArray[i].boundingPoly.vertices[1]);
        array.push(mergedArray[i].boundingPoly.vertices[0]);
    }
}

function getRectangle(vertices, isRoundValues, avgHeight, isAdd) {
    if (isAdd) {
        v[1].y += avgHeight;
        v[0].y += avgHeight;
    } else {
        v[1].y -= avgHeight;
        v[0].y -= avgHeight;
    }

    let yDiff = (v[1].y - v[0].y);
    let xDiff = (v[1].x - v[0].x);

    let gradient = yDiff / xDiff;

    let xThreshMin = 1;
    let xThreshMax = 2000;

    let yMin;
    let yMax;
    if (gradient === 0) {
        yMin = v[0].y;
        yMax = v[0].y;
    } else {
        yMin = (v[0].y) - (gradient * (v[0].x - xThreshMin));
        yMax = (v[0].y) + (gradient * (xThreshMax - v[0].x));
    }

    if (isRoundValues) {
        yMin = Math.round(yMin);
        yMax = Math.round(yMax);
    }
    return {xMin: xThreshMin, xMax: xThreshMax, yMin: yMin, yMax: yMax};
}

var exports = module.exports = {};

exports.getYMax = function(data) {
    return getYMax(data);
};

exports.invertAxis = function(data, yMax) {
    return invertAxis(data, yMax);
};
