function some(array) {
    var arr = array;
    var i, length = arr.length;
    for (i = 0; i < length; i = i + 1) {

        if (Number.isNaN(arr[i])) {
            return true;
        }
    }
    return false;
}


function every(array) {
    var arr = array;

    var i, length = arr.length;
    for (i = 0; i < length; i = i + 1) {

        if (!Number.isNaN(arr[i])) {
            return false;
        }
        return true;
    }
}

console.log(every([1, 4, NaN, 6]));

console.log(every([NaN, NaN]));

console.log(some([1, 2, 6]));

console.log(some([1, 4, NaN, 6]));

