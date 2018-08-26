function mergeArrays(...a) {
    var fullArray = [].concat(...a);
    var uniqueObj = {};
  
    for (var i = 0; i < fullArray.length; i++) {
        var property = fullArray[i];
        uniqueObj[property] = true;
    }
    return Object.keys(uniqueObj);
}

console.log(mergeArrays([1, 2], [3, 4], [5, 6]));
console.log(mergeArrays([1, 2], [2, 4], [4, 6]));