function some(array, func) {
    var arr = array;
    var i, length = arr.length;
    for (i = 0; i < length; i = i + 1) {

        if (func(arr[i])) {
            return true;
        }
    }
    return false;
}


function every(array, func) {
    var arr = array;

    var i, length = arr.length;
    for (i = 0; i < length; i = i + 1) {

        if (!func(arr[i])) {
            return false;
        }
        return true;
    }
}

console.log(every([1, 4, NaN, 6], Number.isNaN));

console.log(every([NaN, NaN], Number.isNaN));

console.log(some([1, 2, 6], Number.isNaN));

console.log(some([1, 4, NaN, 6], Number.isNaN));