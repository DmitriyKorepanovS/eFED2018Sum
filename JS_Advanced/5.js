var currentValue = 3;

function sumWith(number) {
  return this.currentValue += number;
}
var number = 2;

console.log(sumWith(number));


var obj = {
  currentValue: 3
}
console.log(sumWith.call(obj, number))

////////////additionalTask

currentValue = -1;

function additionalSum() {
  return sumWith(2);
}

console.log(additionalSum())
console.log(additionalSum())
console.log(additionalSum())
console.log(additionalSum())