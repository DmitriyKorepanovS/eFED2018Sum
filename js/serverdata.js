var nowDate = new Date();
var dayOfWeek = document.getElementById('dayOfWeek');

function getNamesDays(date) {
  var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return days[date.getDay()];
}
dayOfWeek.textContent = getNamesDays(nowDate);


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

function renderFiveDays2(renderData) {
  var pollution = document.getElementById('pollution');
  pollution.textContent = renderData.data;
}

function renderFiveDays3(renderData) {
  var currentTemperature = document.getElementById('text-style-big-temperature');
  var currentHumidity = document.getElementById('humidity');
  var wind = document.getElementById('wind');

  currentHumidity.textContent = renderData.humidity + `%`;
  currentTemperature.textContent = Math.round(renderData.temp) + `С`;
  wind.textContent = renderData.wind;
}

function renderCity(renderData) {
  var currentCityMain = document.getElementById('currentCityMain');
  currentCityMain.textContent = renderData;
}

var FIVE_DAY_URL = `http://api.openweathermap.org/data/2.5/forecast?q=Izhevsk&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
var pollution = `http://api.openweathermap.org/pollution/v1/co/56,53/current.json?appid=e2c078e26648e8e09b6e90e982007c80`;

function Fetcher() {
  this.fetchData = function (url, success, failure) {
    fetch(url)
      .then(function (response) {
        return Promise.all([response.status, response.json()])
      })
      .then(function (result) {
        console.log(result[0])
        if (result[0] != 200) {

          failure(result);
        } else {
          success(result[1]);
        }
      }).catch(function (error) {
        failure(error)
        alert('Ошибка')
      })
  }
}

function FiveDayFetcher() {
  Fetcher.apply(this, arguments)
  var parentFetcher = this.fetchData;
  this.fetchData = function (url, success, failure) {
    parentFetcher.apply(this, [url, success, failure]);
  }
}

class Transformer {
  cpnstructor() {
    this.transform = function () {}
  }
}

class FiveDayTransformer extends Transformer {
  transform(response) {
    return {
      temp: response.list
    };
  }
}

class FiveDayTransformer2 extends Transformer {
  transform(response) {
    return {
      data: response.data[36].value
    };
  }
}

class FiveDayTransformer3 extends Transformer {
  transform(response) {
    return {
      temp: response.main.temp,
      humidity: response.main.humidity,
      wind: response.wind.speed
    };
  }
}

function Renderer() {
  this.renderHeader = function () {}
  this.renderFooter = function () {}
  this.renderBody = function () {}
}

function FiveDayRenderer() {
  Renderer.apply(this, arguments)
  this.renderBody = renderFiveDays
}

function FiveDayRenderer2() {
  Renderer.apply(this, arguments)
  this.renderBody = renderFiveDays2
}

function FiveDayRenderer3() {
  Renderer.apply(this, arguments)
  this.renderBody = renderFiveDays3
}
///// Default
var fiveDayTransformer = new FiveDayTransformer()
var fetcher = new FiveDayFetcher()
fetcher.fetchData(FIVE_DAY_URL, function (response) {
  var transformFive = fiveDayTransformer.transform(response)
  var renderer = new FiveDayRenderer()
  renderer.renderBody(transformFive)

}, function () {
  alert('fail')
})


var pollution = `http://api.openweathermap.org/pollution/v1/co/56,53/current.json?appid=e2c078e26648e8e09b6e90e982007c80`;
var fiveDayTransformer2 = new FiveDayTransformer2()
var fetcher2 = new FiveDayFetcher()
fetcher2.fetchData(pollution, function (response) {
  var result = fiveDayTransformer2.transform(response)
  var renderer2 = new FiveDayRenderer2()
  renderer2.renderBody(result)

}, function () {
  alert('fail')
})

var fiveDaysInfo2 = `http://api.openweathermap.org/data/2.5/weather?q=Izhevsk&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
var fiveDayTransformer3 = new FiveDayTransformer3()
var fetcher3 = new FiveDayFetcher()
fetcher3.fetchData(fiveDaysInfo2, function (response) {
  var result = fiveDayTransformer3.transform(response)
  var renderer3 = new FiveDayRenderer3()
  renderer3.renderBody(result)

}, function () {
  alert('fail')
})

///////EndDefault

var findCityInput = document.getElementById('findCityInput');
findCityInput.addEventListener("change", changeCity);

function changeCity() {

  var serchRequest = findCityInput.value;
  var fiveDaysInfo = `http://api.openweathermap.org/data/2.5/forecast?q=${serchRequest}&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
  var fiveDayTransformer = new FiveDayTransformer()
  var fetcher = new FiveDayFetcher()
  fetcher.fetchData(fiveDaysInfo, function (response) {
    var result = fiveDayTransformer.transform(response)
    var renderer = new FiveDayRenderer()
    renderer.renderBody(result)


    renderCity(serchRequest);
  }, function () {
    alert('fail')
  })

  var pollution = `http://api.openweathermap.org/pollution/v1/co/56,53/current.json?appid=e2c078e26648e8e09b6e90e982007c80`;
  var fiveDayTransformer2 = new FiveDayTransformer2()
  var fetcher2 = new FiveDayFetcher()
  fetcher2.fetchData(pollution, function (response) {
    var result = fiveDayTransformer2.transform(response)
    var renderer2 = new FiveDayRenderer2()
    renderer2.renderBody(result)

  }, function () {
    alert('fail')
  })

  var fiveDaysInfo2 = `http://api.openweathermap.org/data/2.5/weather?q=${serchRequest}&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
  var fiveDayTransformer3 = new FiveDayTransformer3()
  var fetcher3 = new FiveDayFetcher()
  fetcher3.fetchData(fiveDaysInfo2, function (response) {
    var result = fiveDayTransformer3.transform(response)
    var renderer3 = new FiveDayRenderer3()
    renderer3.renderBody(result)

  }, function () {
    alert('fail')
  })
}

document.getElementById('header-findform').addEventListener('submit', function (event) {
  event.preventDefault();
});