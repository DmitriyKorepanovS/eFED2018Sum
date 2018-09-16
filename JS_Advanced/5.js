  var currentValue = 3;

  function sumWith(number) {
    return this.currentValue += number;
  }
  var number = 2;
  alert(sumWith(number));