function deepCompare(firstObject, secondObject) {
    var countPropertyFirst = 0;
    var countPropertySecond = 0;

    for (var key in firstObject) {
        countPropertyFirst++;
    }
    for (key in secondObject) {
        countPropertySecond++;
    }
    if (countPropertyFirst != countPropertySecond) {
        return false;
    }

    for (key in firstObject) {
        if (firstObject[key] !== secondObject[key]) {
            return false;
        }
    }
    return true;
}

console.log(deepCompare({one:1, two:'2'}, {one:1, two: '2'}));
console.log(deepCompare({one:1, two:'2'}, { two: 2}));
console.log(deepCompare({one:1, two:'2'}, { one:1, two: 2}));
console.log(deepCompare({one:1, two:'2'}, { two: '2', one:1}));