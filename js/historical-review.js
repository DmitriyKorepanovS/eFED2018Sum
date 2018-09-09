var averageMax = document.getElementById('averageMax');
var cellAverageMax = averageMax.querySelectorAll('.cell');

var averageMin = document.getElementById('averageMin');
var cellAverageMin = averageMin.querySelectorAll('.cell');

var recordMax = document.getElementById('recordMax');
var cellrecordMax = recordMax.querySelectorAll('.cell');

var recordMin = document.getElementById('recordMin');
var cellrecordMin = recordMin.querySelectorAll('.cell');

var year = '2016';
var cityHistorical = 'Izhevsk';

function getAverage(array, proprerty, cityHistorical) {
    var selectedByCity = historicalReviewMock[cityHistorical][year]
    for (var i = 0; i < selectedByCity.length; i++) {
        array[i + 1].textContent = selectedByCity[i][proprerty];
    }
}

getAverage(cellAverageMax, 'max', cityHistorical);
getAverage(cellAverageMin, 'min', cityHistorical);
getRecord(cellrecordMax, 'RecordMax', cityHistorical);
getRecord(cellrecordMin, 'RecordMin', cityHistorical);

function getRecord(array, proprerty, cityHistorical) {
    var selectedByCity = historicalReviewMock[cityHistorical][year]
    for (var i = 0; i < selectedByCity.length; i++) {
        array[i + 1].textContent = selectedByCity[i][proprerty];
    }
}


var findCityInput = document.getElementById('findCityInput');
findCityInput.addEventListener("change", changeCity2);

function changeCity2() {
    var cityHistorical = findCityInput.value;
    getAverage(cellAverageMax, 'max', cityHistorical);
    getAverage(cellAverageMin, 'min', cityHistorical);
    getRecord(cellrecordMax, 'RecordMax', cityHistorical);
    getRecord(cellrecordMin, 'RecordMin', cityHistorical);
     
    changeCityInput(cityHistorical);
}

function changeCityInput(cityHistorical) {
    var currentCityInput = document.getElementById('currentCityInput');
    currentCityInput.textContent = cityHistorical;
}
document.getElementById('header-findform').addEventListener('submit', function (event) {
    event.preventDefault();
});