var array = [{'city': 'Izhevsk','year': '2013','avearage': -2,'min': -16,'max': 16},
    {'city': 'Izhevsk', 'year': '2013','avearage': -3,'min': -17,'max': 21},
    {'city': 'Izhevsk','year': '2013','avearage': 0,'min': -6, 'max': 8},
    {'city': 'Izhevsk','year': '2013', 'avearage': 12,'min': 15, 'max': 24},
    {'city': 'Izhevsk','year': '2013', 'avearage': 15,'min': 8,'max': 38},
    {'city': 'Izhevsk','year': '2013','avearage': 19, 'min': 2, 'max': 43},
    {'city': 'Izhevsk', 'year': '2013','avearage': 20,'min': 20,'max': 29},
    {'city': 'Izhevsk','year': '2013','avearage': 21,'min': 0, 'max': 45},
    {'city': 'Izhevsk', 'year': '2013','avearage': 18,'min': 8,'max': 40},
    {'city': 'Izhevsk','year': '2013','avearage': 13,'min': -11,'max': 21},
    {'city': 'Izhevsk','year': '2013', 'avearage': 2,'min': -1,'max': 14},
    {'city': 'Izhevsk','year': '2013','avearage': -2,'min': -10,'max': 22},
    {'city': 'MOSCOW','year': '2018', 'avearage': 70,'min': -5,'max': 70
    }];

function countAverageValue(array, obj) {
    var currentYear = obj.date;
    var currentCity = obj.city;
    var lastYear = currentYear.getFullYear() - 1;
    var temperatureArray = [];

    for (var i = 0; i < array.length; i++) {
        if ((array[i]['year'] == lastYear) && (array[i]['city'] == currentCity)) {
            temperatureArray[i] = array[i]['avearage'];
        }
    }
    var total = temperatureArray.reduce((sum, current) => sum + current);
    var avearageTemperature = Math.round(total / temperatureArray.length);

    return avearageTemperature;
}

console.log(countAverageValue(array, {
    city: 'Izhevsk',
    date: new Date(2014, 0)
}));
