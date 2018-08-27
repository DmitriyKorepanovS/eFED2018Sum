function makeArray(start, end, step) {
    var array = [];
    if (step == undefined) {
        step = 1;
    }
    if (step > 0) {
        for (var i = start; i <= end; i += step) {
            array.push(i);
        }
    } else {
        for (i = start; i >= end; i += step) {
            array.push(i);
        }
    }
    return array;
}

console.log(makeArray(1, 10));
console.log(makeArray(1, 10, 3));
console.log(makeArray(10, 1, -2));