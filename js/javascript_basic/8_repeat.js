function multiplyOrThrow(a, b) {
  if (Math.random() < 0.5) {
    return a * b;
  } else {
    throw 'MultiplicatorUnitFailure';
  }
}

function again(a, b) {
  try {
    return multiplyOrThrow(a, b);
  } catch (e) {
    console.log('запуск с ошибкой');
    return again(a, b);
  }
}

console.log(again(3, 5));