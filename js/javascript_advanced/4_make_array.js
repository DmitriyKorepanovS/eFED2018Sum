function makeArray(startNumber, endNumber, step) {
    var result = [];

    if (step == undefined) {
        step = 1;
    }
    if (step < 0) {
        step = Math.abs(step)
    }
    if (startNumber > endNumber) {
        while (startNumber >= endNumber) {
            result.push(startNumber);
            startNumber = startNumber - step;
        }
        return (result);
    } else {
        while (startNumber <= endNumber) {
            result.push(startNumber);
            startNumber = startNumber + step;
        }
        return (result);
    }
}

console.log(makeArray(1, 10));
console.log(makeArray(1, 10, 3));
console.log(makeArray(10, 1, -2));