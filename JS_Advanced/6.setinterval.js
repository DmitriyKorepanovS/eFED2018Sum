var timerId = setInterval(function () {
  alert('one');
  alert('two');
  alert('three');
  alert('four');
  alert('five');
}, 2000);


setTimeout(function () {
  clearInterval(timerId);
  alert('stop');
}, 6000);


// additional task 

function delay(f, ms) {

  return function () {
    var savedThis = this;
    var savedArgs = arguments;

    setTimeout(function () {
      f.apply(savedThis, savedArgs);
    }, ms);
  };

}

function f(x) {
  alert(x);
}

var f1000 = delay(f, 1000);
var f3000 = delay(f, 4000);
var f5000 = delay(f, 9000);
var f7000 = delay(f, 16000);
var f9000 = delay(f, 25000);

f1000('через 1 секунду');
f3000('через 3 секунды');
f5000('через 5 секунд');
f7000('через 7 секунд');
f9000('через 9 секунд');
