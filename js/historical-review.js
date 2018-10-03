let obj = {
    cellAverageMax: document.querySelectorAll('#averageMax >.cell'),
    cellAverageMin: document.querySelectorAll('#averageMin > .cell'),
    cellrecordMax: document.querySelectorAll('#recordMax > .cell'),
    cellrecordMin: document.querySelectorAll('#recordMin > .cell')
}

const YEAR = '2016';
let CityName = 'Izhevsk';

function getAverage(array, proprerty, CityName) {
    let selectedByCity = historicalReviewMock[CityName][YEAR]
    for (let i = 0; i < selectedByCity.length; i++) {
        array[i + 1].textContent = selectedByCity[i][proprerty];
    }
}

getAverage(obj.cellAverageMax, 'max', CityName);
getAverage(obj.cellAverageMin, 'min', CityName);
getRecord(obj.cellrecordMax, 'RecordMax', CityName);
getRecord(obj.cellrecordMin, 'RecordMin', CityName);

function getRecord(array, proprerty, CityName) {
    var selectedByCity = historicalReviewMock[CityName][YEAR]
    for (let i = 0; i < selectedByCity.length; i++) {
        array[i + 1].textContent = selectedByCity[i][proprerty];
    }
}

const findCityInput = document.getElementById('findCityInput');
findCityInput.addEventListener("change", changeCity);

function changeCity() {
    let CityName = findCityInput.value;
    getAverage(obj.cellAverageMax, 'max', CityName);
    getAverage(obj.cellAverageMin, 'min', CityName);
    getRecord(obj.cellrecordMax, 'RecordMax', CityName);
    getRecord(obj.cellrecordMin, 'RecordMin', CityName);
    changeCityInput(CityName);
}

function changeCityInput(CityName) {
    document.getElementById('currentCityInput').textContent = CityName;
}
document.getElementById('header-findform').addEventListener('submit', event => {
    event.preventDefault();
});