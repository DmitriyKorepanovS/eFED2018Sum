function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function compare(value1, value2) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (value1 === 'undefined' || value1 === null || !isNumber(value1)) {
                reject('value1 is not in correct format')
            }

            if (value2 === 'undefined' || value2 === null || !isNumber(value2)) {
                reject('value2 is not in correct format')
            }

            if (value1 < value2) {
                resolve(-1)
            }

            if (value1 == value2) {
                resolve(0)
            }

            if (value1 > value2) {
                resolve(1)
            }

        }, 1000);
    });
}

compare(2, 2)
    .then(function (result) {
        console.log(result);
    })
    .catch(function (result) {
        console.log('Error message: ' + result);
    })