function makeArray (start, end, step) {

var result = [];
if (step == undefined) { step =1} 
if (step <0) { step = Math.abs(step)} 

if (start > end){
    while (start >= end) {
      result.push(start);
      start=start-step;
    }
    return (result);
}

else {
    while (start <= end) {
      result.push(start);
      start=start+step;
    }
    return (result);

}

}

console.log (makeArray (1, 10));
console.log (makeArray (1, 10, 3));
console.log (makeArray (10, 1, -2));