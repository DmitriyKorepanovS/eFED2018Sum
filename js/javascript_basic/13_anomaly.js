var array = [{
    id: '223',
    param: '15'
}, {
    id: '321',
    param: '45'
}, {
    id: '123',
    param: '-13'
}];

function findAnomaly(array, param) {
    var x = array[0][param];
    var arrMax = {};
    var arrMin = {};
    for (i = 0; i < array.length; i++) {

        if (array[i][param] > x) {
            arrMax = array[i];
        }
    }
    for (i = 0; i < array.length; i++) {

        if (array[i][param] < x) {
            arrMin = array[i];
        }
    }
    return console.log(arrMin, arrMax);
}

console.log(findAnomaly(array, `param`));
