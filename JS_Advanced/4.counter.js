var currentCount = 0;

function makeCounter() {

  return {
    Next: function () {
      return currentCount++;
    },
    Prev: function () {
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
