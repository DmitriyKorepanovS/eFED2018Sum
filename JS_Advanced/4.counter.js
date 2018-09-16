var currentCount = 0;
var hystory = [];

function makeCounter() {

  return {
    Next: function () {
      hystory.push(currentCount);
      return currentCount++;
    },
    Prev: function () {
      hystory.push(currentCount);
      return currentCount--;
    },
  };
}

var counter = makeCounter();

counter.Next();
console.log(currentCount);

counter.Next();
console.log(currentCount);

counter.Prev();
console.log(currentCount);

counter.Prev();
console.log(currentCount);

counter.Prev();
console.log(currentCount);

if (hystory.length >= 10) {
  hystory = hystory.slice(-10);
}

console.log(hystory);