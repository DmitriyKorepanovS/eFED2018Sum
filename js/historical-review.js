const averageMax = document.getElementById('averageMax');
const cellAverageMax = averageMax.querySelectorAll('.cell');

const averageMin = document.getElementById('averageMin');
const cellAverageMin = averageMin.querySelectorAll('.cell');

const recordMax = document.getElementById('recordMax');
const cellrecordMax = recordMax.querySelectorAll('.cell');

const recordMin = document.getElementById('recordMin');
const cellrecordMin = recordMin.querySelectorAll('.cell');

let year = '2016';
let cityHistorical = 'Izhevsk';

function getAverage(array, proprerty, cityHistorical) {
    let selectedByCity = historicalReviewMock[cityHistorical][year]
    for (let i = 0; i < selectedByCity.length; i++) {
        array[i + 1].textContent = selectedByCity[i][proprerty];
    }
}

getAverage(cellAverageMax, 'max', cityHistorical);
getAverage(cellAverageMin, 'min', cityHistorical);
getRecord(cellrecordMax, 'RecordMax', cityHistorical);
getRecord(cellrecordMin, 'RecordMin', cityHistorical);

function getRecord(array, proprerty, cityHistorical) {
    var selectedByCity = historicalReviewMock[cityHistorical][year]
    for (let i = 0; i < selectedByCity.length; i++) {
        array[i + 1].textContent = selectedByCity[i][proprerty];
    }
}


const findCityInput = document.getElementById('findCityInput');
findCityInput.addEventListener("change", changeCity2);

function changeCity2() {
    let cityHistorical = findCityInput.value;
    getAverage(cellAverageMax, 'max', cityHistorical);
    getAverage(cellAverageMin, 'min', cityHistorical);
    getRecord(cellrecordMax, 'RecordMax', cityHistorical);
    getRecord(cellrecordMin, 'RecordMin', cityHistorical);
     
    changeCityInput(cityHistorical);
}

function changeCityInput(cityHistorical) {
    const currentCityInput = document.getElementById('currentCityInput');
    currentCityInput.textContent = cityHistorical;
}
document.getElementById('header-findform').addEventListener('submit', event => {
    event.preventDefault();
});