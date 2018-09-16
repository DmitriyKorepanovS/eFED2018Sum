function random() {
    return new Promise(function (resolve) {
        var timeout = Math.random() * 3000;
        setTimeout(function () {
            resolve(Math.random() * 3);
        }, timeout)
    })
}

Promise.all([random(), random(), random(), random(), random(), random(), random()]).then(function (results) {
    console.log(results);
});
