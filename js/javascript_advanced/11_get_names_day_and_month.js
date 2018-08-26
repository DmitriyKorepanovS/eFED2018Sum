function getNames(date) {
    var days = ['Sunday', 'Mondey', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augest', 'September', 'october', 'november', 'december'];

    return month[date.getMonth()] + ',' + days[date.getDay()];
}

console.log(getNames(new Date(2018, 7, 17)));