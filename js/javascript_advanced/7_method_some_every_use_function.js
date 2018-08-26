function isSomeItemNaN(array, func) {
    
    for (var i = 0; i < array.length; i = i + 1) {
        if (func(array[i])) {
            return true;
        }
    }
    return false;
}

function isEveryItemNaN(array, func) {

    for (var i = 0; i < array.length; i = i + 1) {
        if (!func(array[i])) {
            return false;
        }
        return true;
    }
}

console.log(isEveryItemNaN([1, 4, NaN, 6], Number.isNaN));
console.log(isEveryItemNaN([NaN, NaN], Number.isNaN));
console.log(isSomeItemNaN([1, 2, 6], Number.isNaN));
console.log(isSomeItemNaN([1, 4, NaN, 6], Number.isNaN));