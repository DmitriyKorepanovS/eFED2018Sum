var array = [{
    id: '223',
    param: '15'
}, {
    id: '111',
    param: '45'
}, {
    id: '123',
    param: '-13'
}];

function findAnomaly(arr, param) {
    var min = arr.reduce(function (previousItem, currentItem) {
        return (previousItem[param] > currentItem[param]) ? currentItem : previousItem;
    });

    var max = arr.reduce(function (previousItem, currentItem) {
        return (previousItem[param] < currentItem[param]) ? currentItem : previousItem;
    });

    return {
        min,
        max
    };
}

console.log(findAnomaly(array, 'param'));