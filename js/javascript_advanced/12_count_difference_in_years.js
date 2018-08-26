function countDifferenceInYears(firstDate, secondDate) {
    var years = secondDate.getFullYear() - firstDate.getFullYear();
    var month = Math.round((secondDate.getMonth() - firstDate.getMonth()) * 0.0833333333333333 * 10) / 10;

    return years + month;
}

console.log(countDifferenceInYears(new Date(2014, 10, 2), new Date(2016, 10, 2)));
console.log(countDifferenceInYears(new Date(2014, 0), new Date(2014, 6)));
