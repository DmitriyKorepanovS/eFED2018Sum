function reverseArray(array) {
    var buffer;
    for (var i = 0, j = array.length - 1; i < j; i++, j--) {
        buffer = array[j];
        array[j] = array[i];
        array[i] = buffer;
    }
    return array;
}

console.log(reverseArray([1, 2, 3, 4]));




var array = ['A', 'B', 'C', 'D'];

function reverseArrayInPlace(array) {
    var i = 0;
    while (i < array.length - 1) {
        array.splice(i, 0, array.pop());
        i++;
    }
    return (array);
}

reverseArrayInPlace(array);
console.log(array);