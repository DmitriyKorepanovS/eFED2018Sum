function random(sumWith) {
    return new Promise(function (resolve) {
        var timeout = Math.random() * 1000;
        setTimeout(function () {
                resolve(Math.random() * 3 + sumWith);
            },
            timeout)
    })
}


random(0)
    .then(function (result) {
        alert(result);
        return random(result);

    })
    .then(function (result) {
        alert(result);
        return random(result);

    })
    .then(function (result) {
        alert(result);
        return random(result);
    })