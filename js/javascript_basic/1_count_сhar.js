function countChar(strmain, x) {

  var count = 0;

  var str = strmain.toLowerCase();
  
  var lowerx = x.toLowerCase();

  var pos = str.indexOf(lowerx);

  while (pos !== -1) {
    count++;
    pos = str.indexOf(lowerx, pos + 1);
  }
  return count;
}

console.log(countChar('MyRandomString', 'm'));