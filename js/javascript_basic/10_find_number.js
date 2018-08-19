function findNumbers(array) {

    var pattern = /^[\+\-]?\d*(?:(?<=\d)\.)?(?:\.(?=\d))?\d*(?:[Ee][\+\-]?\d+)?$/;

    var clear = array.filter(function (item) {
        return pattern.test(item);
    })

    return clear;
}
    console.log(findNumbers(["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4", "1e+12"])); 
    
    console.log(findNumbers(["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5","."]));