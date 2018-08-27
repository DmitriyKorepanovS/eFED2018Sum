function countDifferenceInYears(firstDate, secondDate) {
    var years = secondDate.getFullYear() - firstDate.getFullYear();
    const ProportionOneMonth = 1/12;
    var month = Math.round((secondDate.getMonth() - firstDate.getMonth()) * ProportionOneMonth * 10) / 10;

    return years + month;
}

console.log(countDifferenceInYears(new Date(2014, 10, 2), new Date(2016, 10, 2)));
console.log(countDifferenceInYears(new Date(2014, 0), new Date(2014, 6)));
