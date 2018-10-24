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

var exports = module.exports = {};

exports.getYMax = function(data) {
    return getYMax(data);
};
