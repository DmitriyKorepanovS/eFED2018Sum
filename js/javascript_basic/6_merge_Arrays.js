function mergeArrays(...a) {
  c = [].concat(...a);
  var obj = {};
  for (var i = 0; i < c.length; i++) {
    var str = c[i];
    obj[str] = true;
  }
  return Object.keys(obj);
}

console.log(mergeArrays([1, 2], [3, 4], [5, 6]));

console.log(mergeArrays([1, 2], [2, 4], [4, 6]));