function getNamesDays(date) {
  const DAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return DAYS[date.getDay()];
}

function getShortNamesDays() {
  const DAYS_WK_SHORT = ['Вc', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб',
    'Вc', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб',
    'Вc', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
  ];
  return DAYS_WK_SHORT
}

function renderDayOfWeek() {
  let nowDate = new Date();
  const DAY_OF_WEEK = document.getElementById('dayOfWeek');
  DAY_OF_WEEK.textContent = getNamesDays(nowDate);
}

function renderFiveDays(renderData) {
  const ITEMS_TEMPERATURA = document.getElementById('two-items-temperature');
  const SELECT_TEMP = ITEMS_TEMPERATURA.querySelectorAll('.temp');
  const SELECT_HEIGHT = ITEMS_TEMPERATURA.querySelectorAll('.heightTemp');

  const ITEMS_TEMPERATURA_PART2 = document.getElementById('two-items-temperaturePart2');
  const SELECT_TEMP_PART2 = ITEMS_TEMPERATURA_PART2.querySelectorAll('.temp');
  const SELECT_HEIGHT_PART2 = ITEMS_TEMPERATURA_PART2.querySelectorAll('.heightTemp');

  const TWO_ITEMS_WIND = document.getElementById('two-items-wind');
  const SELECT_WINDSPEED = TWO_ITEMS_WIND.querySelectorAll('.windSpeed');

  const TWO_ITEMS_WIND_PART2 = document.getElementById('two-items-wind-part2');
  const SELECT_WINDSPEED_2 = TWO_ITEMS_WIND_PART2.querySelectorAll('.windSpeed');

  const PRESIPATION_PART1 = document.getElementById('precipation_part1');
  const SELECT_precipationValue = PRESIPATION_PART1.querySelectorAll('.precipationValue');
  const SELECT_height_precipation = PRESIPATION_PART1.querySelectorAll('.probabilityValue');

  const PRESIPATION_PART2 = document.getElementById('precipation_part2');
  const SELECT_precipationValue_2 = PRESIPATION_PART2.querySelectorAll('.precipationValue');
  const SELECT_height_precipation_2 = PRESIPATION_PART2.querySelectorAll('.probabilityValue');

  for (let i = 0; i < 4; i++) {
    SELECT_TEMP_PART2[i].textContent = Math.round(renderData.temp[i + 4].main.temp);
    SELECT_HEIGHT_PART2[i].style.height = Math.round(renderData.temp[i + 4].main.temp) + "px";

    SELECT_TEMP[i].textContent = Math.round(renderData.temp[i].main.temp);
    SELECT_HEIGHT[i].style.height = Math.round(renderData.temp[i].main.temp) + "px";

    SELECT_WINDSPEED[i].textContent = Math.round(renderData.temp[i].wind.speed);
    SELECT_WINDSPEED_2[i].textContent = Math.round(renderData.temp[i + 4].wind.speed);

    SELECT_precipationValue[i].textContent = Math.round(renderData.temp[i].main.humidity - 16);
    SELECT_precipationValue_2[i].textContent = Math.round(renderData.temp[i + 12].main.humidity - 16);
  }

  for (let i = 0; i < 12; i++) {
    SELECT_height_precipation[i].style.height = Math.round(renderData.temp[i].main.humidity / 4) + "px";
    SELECT_height_precipation_2[i].style.height = Math.round(renderData.temp[i + 12].main.humidity / 4) + "px";
  }

  const TEMPERATURE_8DAYS = document.getElementById('dayWeather8days');
  const DAY_WEATHER = TEMPERATURE_8DAYS.querySelectorAll('.tempDay');

  const SHORT_NAMES_WEEK = getShortNamesDays();
  const DAYS_OF_WEEK = TEMPERATURE_8DAYS.querySelectorAll('.text-style-dayofweek');
  let nowDate = new Date();
  let start = nowDate.getDay();

  const ICON_WEATHER = TEMPERATURE_8DAYS.querySelectorAll('.iconWeather');

  for (let i = 0; i < 8; i++) {
    DAY_WEATHER[i].textContent = Math.round(renderData.temp[i * 4].main.temp) + 'C';

    DAYS_OF_WEEK[i].textContent = SHORT_NAMES_WEEK[i + start]

    let iconChange = renderData.temp[i * 4].weather[0].description;
    ICON_WEATHER[i].setAttribute('src', `images/${iconChange}.png`);
  }

}

function renderHeaderPollution(renderData) {

  const pollution = document.getElementById('pollution');
  pollution.textContent = renderData.data;
}

function renderCurrentDay(renderData) {
  const CURRENT_TEMPERATURE = document.getElementById('text-style-big-temperature');
  const currentHumidity = document.getElementById('humidity');
  const CURRENT_RAIN = document.getElementById('precipitation')
  const WIND = document.getElementById('wind');
  const PICTURE_CURRENT_WEATHER = document.getElementById('pictureCurrentWeather');

  currentHumidity.textContent = renderData.humidity + `%`;
  CURRENT_RAIN.textContent = renderData.humidity - 16 + `%`
  CURRENT_TEMPERATURE.textContent = Math.round(renderData.temp) + `С`;
  WIND.textContent = renderData.wind;
  let iconWeather = renderData.icon;

  PICTURE_CURRENT_WEATHER.setAttribute('src', `images/${iconWeather}.png`);
}

function renderCity(renderData) {
  const currentCityMain = document.getElementById('currentCityMain');
  currentCityMain.textContent = renderData;
}

function Fetcher() {
  this.fetchData = (url, success, failure) => {
    fetch(url)
      .then(response => {
        return Promise.all([response.status, response.json()])
      })
      .then(result => {
        console.log(result[0])
        if (result[0] != 200) {
          failure(result);
        } else {
          success(result[1]);
        }
      }).catch(error => {
        failure(error)
      })
  }
}

function FiveDayFetcher() {
  Fetcher.apply(this, arguments)
  const parentFetcher = this.fetchData;
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

class HeaderPollution_Transformer extends Transformer {
  transform(response) {
    return {
      data: response.data[36].value
    };
  }
}

class CurrentDay_Transformer extends Transformer {
  transform(response) {
    return {
      temp: response.main.temp,
      humidity: response.main.humidity,
      wind: response.wind.speed,
      icon: response.weather[0].description
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

function PollutionRenderer() {
  Renderer.apply(this, arguments)
  this.renderHeader = renderHeaderPollution
}

function CurrentDay_Renderer() {
  Renderer.apply(this, arguments)
  this.renderBody = renderCurrentDay
}
///// Default
function init() {
  const FIVE_DAY_URL = `http://api.openweathermap.org/data/2.5/forecast?q=Izhevsk&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
  var fiveDayTransformer = new FiveDayTransformer()
  var fetcher = new FiveDayFetcher()
  fetcher.fetchData(FIVE_DAY_URL, response => {
    var transformFive = fiveDayTransformer.transform(response)
    var renderer = new FiveDayRenderer()
    renderer.renderBody(transformFive)

  }, () => {
    alert('fail')
  })

  const POLLUTION = `http://api.openweathermap.org/pollution/v1/co/56,53/current.json?appid=e2c078e26648e8e09b6e90e982007c80`;
  var headerPollution_Transformer = new HeaderPollution_Transformer()
  var fetcher2 = new FiveDayFetcher()
  fetcher2.fetchData(POLLUTION, response => {
    var result = headerPollution_Transformer.transform(response)
    var renderer2 = new PollutionRenderer()
    renderer2.renderHeader(result)

  }, () => {
    alert('fail')
  })

  const FIVE_DAYS_INFO2 = `http://api.openweathermap.org/data/2.5/weather?q=Izhevsk&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
  var currentDay_Transformer = new CurrentDay_Transformer()
  var fetcher3 = new FiveDayFetcher()
  fetcher3.fetchData(FIVE_DAYS_INFO2, response => {
    var result = currentDay_Transformer.transform(response)
    var renderer3 = new CurrentDay_Renderer()
    renderer3.renderBody(result)

  }, () => {
    alert('fail')
  })
  renderDayOfWeek()
}

init()
///////EndDefault

var findCityInput = document.getElementById('findCityInput');
findCityInput.addEventListener("change", changeCity);

function changeCity() {

  let serchRequest = findCityInput.value;
  let fiveDaysInfo = `http://api.openweathermap.org/data/2.5/forecast?q=${serchRequest}&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
  var fiveDayTransformer = new FiveDayTransformer()
  var fetcher = new FiveDayFetcher()
  fetcher.fetchData(fiveDaysInfo, response => {
    var result = fiveDayTransformer.transform(response)
    var renderer = new FiveDayRenderer()
    renderer.renderBody(result)

    renderCity(serchRequest);
  }, () => {
    alert('fail')
  })

  let pollution = `http://api.openweathermap.org/pollution/v1/co/56,53/current.json?appid=e2c078e26648e8e09b6e90e982007c80`;
  var headerPollution_Transformer = new HeaderPollution_Transformer()
  var fetcher2 = new FiveDayFetcher()
  fetcher2.fetchData(pollution, response => {
    var result = headerPollution_Transformer.transform(response)
    var renderer2 = new PollutionRenderer()
    renderer2.renderBody(result)

  }, () => {
    alert('fail')
  })

  let fiveDaysInfo2 = `http://api.openweathermap.org/data/2.5/weather?q=${serchRequest}&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
  var currentDay_Transformer = new CurrentDay_Transformer()
  var fetcher3 = new FiveDayFetcher()
  fetcher3.fetchData(fiveDaysInfo2, response => {
    var result = currentDay_Transformer.transform(response)
    var renderer3 = new CurrentDay_Renderer()
    renderer3.renderBody(result)

  }, () => {
    alert('fail')
  })
}

document.getElementById('header-findform').addEventListener('submit', event => {
  event.preventDefault();
});