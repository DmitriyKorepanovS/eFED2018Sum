var nowDate = new Date();
var dayOfWeek = document.getElementById('dayOfWeek');

function getNamesDays(date) {
  var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return days[date.getDay()];
}
dayOfWeek.textContent = getNamesDays(nowDate);


function transform(str) {
  var renderData = {
    temp: str.main.temp,
    humidity: str.main.humidity,
    wind: str.wind.speed
  };

  render(renderData);
}

function render(renderData) {
  var currentTemperature = document.getElementById('text-style-big-temperature');
  var currentHumidity = document.getElementById('humidity');
  var wind = document.getElementById('wind');

  currentHumidity.textContent = renderData.humidity + `%`;
  currentTemperature.textContent = Math.round(renderData.temp) + `С`;
  wind.textContent = renderData.wind;
}

function transformFiveDays(str) {
  var renderData = {
    temp: str.list
  };

  renderFiveDays(renderData);
}

function renderFiveDays(renderData) {

  var arrayProp = document.getElementById('two-items-temperature');
  var prop = arrayProp.querySelectorAll('.temp');
  var height = arrayProp.querySelectorAll('.heightTemp');

  var arrayPropPart2 = document.getElementById('two-items-temperaturePart2');
  var propPart2 = arrayPropPart2.querySelectorAll('.temp');
  var heightPart2 = arrayPropPart2.querySelectorAll('.heightTemp');

  for (var i = 0; i < 4; i++) {
    prop[i].textContent = Math.round(renderData.temp[i].main.temp);
    height[i].style.height = Math.round(renderData.temp[i].main.temp) + "px";
  }
  for (var i = 0; i < 4; i++) {
    propPart2[i].textContent = Math.round(renderData.temp[i + 4].main.temp);
    heightPart2[i].style.height = Math.round(renderData.temp[i + 4].main.temp) + "px";
  }

  var temperature8days = document.getElementById('dayWeather8days');
  var dayWeather = temperature8days.querySelectorAll('.tempDay');

  for (var i = 0; i < 8; i++) {
    dayWeather[i].textContent = Math.round(renderData.temp[i * 4].main.temp) + 'C';
  }

}

function transformPollution(str) {
  var renderData = {
    data: str.data[36].value
  };

  renderPollution(renderData);
}

function renderPollution(renderData) {
  var pollution = document.getElementById('pollution');
  pollution.textContent = renderData.data;

}


function renderCity(renderData) {
  var currentCityMain = document.getElementById('currentCityMain');
  currentCityMain.textContent = renderData;
}

function loadArray(callback, city) {
  fetch(city)
    .then(function (response) {
      return Promise.all([response.status, response.json()])
    })
    .then(function (result) {
      if (result[0] != 200) {

        console.log('Ошибка');
      } else {
        callback(result[1]);
      }
    }).catch(function (error) {
      alert('Ошибка')
    })

}
var city = `http://api.openweathermap.org/data/2.5/weather?q=Izhevsk&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
loadArray(transform, city)
var pollution = `http://api.openweathermap.org/pollution/v1/co/56,53/current.json?appid=e2c078e26648e8e09b6e90e982007c80`;
loadArray(transformPollution, pollution)
var cityDefault = `http://api.openweathermap.org/data/2.5/forecast?q=Izhevsk&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`
loadArray(transformFiveDays, cityDefault)

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
  loadArray(transformPollution, pollution)
}

document.getElementById('header-findform').addEventListener('submit', function (event) {
  event.preventDefault();
});