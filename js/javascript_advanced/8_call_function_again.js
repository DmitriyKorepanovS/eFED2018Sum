function multiplyOrThrow(firstValue, secondValue) {
    if (Math.random() < 0.5) {
        return firstValue * secondValue;
    } else {
        throw 'MultiplicatorUnitFailure';
    }
}

function callFunctionAgain(firstValue, secondValue) {
    try {
        return multiplyOrThrow(firstValue, secondValue);
    } catch (e) {
        console.log('запуск с ошибкой');
        return callFunctionAgain(firstValue, secondValue);
    }
}

console.log(callFunctionAgain(3, 5));