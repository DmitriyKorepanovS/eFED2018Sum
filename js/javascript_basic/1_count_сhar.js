function countChar(strmain, x) {

  var count = 0;

  var str = strmain.toLowerCase();

  var pos = str.indexOf(x);

  while (pos !== -1) {
    count++;
    pos = str.indexOf(x, pos + 1);
  }
  return count;
}

console.log(countChar('MyRandomString', 'm'));