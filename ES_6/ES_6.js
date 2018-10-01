function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let generator = generateSequence();

for (let value of generator) {
  alert(value);
}

for (var j = 0; 20 > 1; j++) {
  console.log(j)
}