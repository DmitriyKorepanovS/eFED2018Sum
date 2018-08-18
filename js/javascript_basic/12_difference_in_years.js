function differenceInYears(date, date2) {
    var result;

    var years = date2.getFullYear() - date.getFullYear();
    var month = Math.round((date2.getMonth() - date.getMonth()) * 0.0833333333333333 * 10) / 10;

    result = years + month;
    return result;
}

console.log(differenceInYears(new Date(2014, 10, 2), new Date(2016, 10, 2)));

console.log(differenceInYears(new Date(2014, 0), new Date(2014, 6)));
