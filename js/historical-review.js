var averageMax = document.getElementById('averageMax');
var cellAverageMax = averageMax.querySelectorAll('.cell');

var averageMin = document.getElementById('averageMin');
var cellAverageMin = averageMin.querySelectorAll('.cell');

var recordMax = document.getElementById('recordMax');
var cellrecordMax = recordMax.querySelectorAll('.cell');

var recordMin = document.getElementById('recordMin');
var cellrecordMin = recordMin.querySelectorAll('.cell');

var city = 'Izhevsk';
var year = '2016';



var selectedByCity = historicalReviewMock[city][year]

function getAverage(array, proprerty) {
    for (var i = 0; i < selectedByCity.length; i++) {
        array[i + 1].textContent = selectedByCity[i][proprerty];
    }
}

getAverage(cellAverageMax, 'max');
getAverage(cellAverageMin, 'min');

for (var i = 0; i < selectedByCity.length; i++) {
    cellrecordMax[i + 1].textContent = selectedByCity[i]['avearage'];
}

for (var i = 0; i < selectedByCity.length; i++) {
    cellrecordMin[i + 1].textContent = selectedByCity[i]['avearage'];
}

console.log(selectedByCity);
