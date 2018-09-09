//var city='Izhevsk';
function transform(str) {
  var superArray = JSON.parse(str)
  console.log (superArray)

  var renderData = {
    temp: superArray.main.temp,
    humidity: superArray.main.humidity,
    wind: superArray.wind.speed
  };

  render(renderData);
}
function render(renderData) {
  var currentTemperature = document.getElementById('text-style-big-temperature');
  var currentHumidity = document.getElementById('humidity');
  var wind =  document.getElementById('wind');

  console.log(currentHumidity.textContent = renderData.humidity + `%`);
  console.log(currentTemperature.textContent = Math.round(renderData.temp) + `С`);
  console.log(wind.textContent = renderData.wind);
}

function transformFiveDays(str) {
  var superArray = JSON.parse(str)

  var renderData = {
  };

  renderFiveDays(renderData);
}

function renderFiveDays(renderData) {
  var temperature8days = document.getElementById('dayWeather8days');
  var dayWeather = temperature8days.querySelectorAll('.day-weather-temperature__nextday');
}

function transformPollution(str) {
  var superArray = JSON.parse(str)
  console.log(superArray);
  var renderData = {
 data:superArray.data[36].value
  };
  console.log(renderData);
  renderPollution(renderData);
}

function  renderPollution (renderData){
  var pollution = document.getElementById('pollution');
  pollution.textContent = renderData.data;

}


function renderCity(renderData) {
  var currentCityMain = document.getElementById('currentCityMain');
  currentCityMain.textContent = renderData;
}
//renderCity(city) 




function loadArray(callback, city) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', city, true);
  xhr.send();

  xhr.onreadystatechange = function () {

    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {

      console.log('Ошибка');
    } else {
      callback(xhr.responseText);
    }
  }

}
var city = `http://api.openweathermap.org/data/2.5/weather?q=Izhevsk&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
loadArray(transform, city)


var findCityInput = document.getElementById('findCityInput');
findCityInput.addEventListener("change", changeCity);


function changeCity() {

  var serchRequest = findCityInput.value;
  renderCity(serchRequest);
  var fiveDaysInfo = `http://api.openweathermap.org/data/2.5/forecast?q=${serchRequest}&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
  serchRequest = `http://api.openweathermap.org/data/2.5/weather?q=${serchRequest}&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
  var pollution = `http://api.openweathermap.org/pollution/v1/co/56,53/current.json?appid=e2c078e26648e8e09b6e90e982007c80`;
  loadArray(transform, serchRequest);
  loadArray(transformFiveDays, fiveDaysInfo)
  loadArray (transformPollution, pollution)

}

document.getElementById('header-findform').addEventListener('submit', function (event) {
  event.preventDefault();
});