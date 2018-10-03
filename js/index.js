function getNamesDays(date) {
  const NAMEDAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return NAMEDAYS[date.getDay()];
}

function getShortNamesDays() {
  return ['Вc', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб','Вc', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вc', 'Пн'];
}

function renderDayOfWeek() {
  let nowDate = new Date();
  document.getElementById('dayOfWeek').textContent = getNamesDays(nowDate);
}

function renderFiveDays(renderData) {
  const obj ={
    countSelectedElement: 4,
    countSelectedElement2: 12,
    countSelectedElement3: 8
  }
  
  for (let i = 0; i < obj.countSelectedElement; i++) {
    document.querySelectorAll('.temp1')[i].textContent = Math.round(renderData.temp[i].main.temp);
    document.querySelectorAll('.heightTemp1')[i].style.height = `${Math.round(renderData.temp[i].main.temp)}px`;
    document.querySelectorAll('.temp2')[i].textContent = Math.round(renderData.temp[i + 4].main.temp);
    document.querySelectorAll('.heightTemp2')[i].style.height = `${Math.round(renderData.temp[i + 4].main.temp)}px`;
    document.querySelectorAll('.windSpeed1')[i].textContent = Math.round(renderData.temp[i].wind.speed);
    document.querySelectorAll('.windSpeed2')[i].textContent = Math.round(renderData.temp[i + 4].wind.speed);
    document.querySelectorAll('.precipationValue1')[i].textContent = Math.round(renderData.temp[i].main.humidity - 16);
    document.querySelectorAll('.precipationValue2')[i].textContent = Math.round(renderData.temp[i + 12].main.humidity - 16);
  }

  for (let i = 0; i < obj.countSelectedElement2; i++) {
    document.querySelectorAll('.probabilityValue1')[i].style.height = `${Math.round(renderData.temp[i].main.humidity / 4)}px`;
    document.querySelectorAll('.probabilityValue2')[i].style.height = `${Math.round(renderData.temp[i + 12].main.humidity / 4)}px`;
  }

  const SHORT_NAMES_WEEK = getShortNamesDays();
  let nowDate = new Date();
  let start = nowDate.getDay();

  for (let i = 0; i < obj.countSelectedElement3; i++) {
    document.querySelectorAll('.tempDay')[i].textContent = `${Math.round(renderData.temp[i * 4].main.temp)}C`;
    document.querySelectorAll('.text-style-dayofweek')[i].textContent = SHORT_NAMES_WEEK[i + start];

    let iconChange = renderData.temp[i * 4].weather[0].description;
    document.querySelectorAll('.iconWeather')[i].setAttribute('src', `images/${iconChange}.png`)
    let deg = renderData.temp[i].wind.deg;
    document.querySelectorAll('.wind-arrow')[i].setAttribute('style', `transform: rotate(${deg}deg)`);
  }
}

function renderHeaderPollution(renderData) {
  document.getElementById('pollution').textContent =Math.round(renderData.data*10000000)/10000000;
}

function renderCurrentDay(renderData) {
  document.getElementById('humidity').textContent = `${renderData.humidity}%`;
  document.getElementById('precipitation').textContent = `${renderData.humidity - 16}%`;
  document.getElementById('text-style-big-temperature').textContent = `${Math.round(renderData.temp)}С`;
  document.getElementById('wind').textContent = renderData.wind;

  let iconWeather = renderData.icon;
  document.getElementById('pictureCurrentWeather').setAttribute('src', `images/${iconWeather}.png`);
}

function renderCity(renderData) {
  document.getElementById('currentCityMain').textContent = renderData;
}

function Fetcher() {
  this.fetchData = (url, success, failure) => {
    fetch(url)
      .then(response => {
        return Promise.all([response.status, response.json()])
      })
      .then(result => {
       // console.log(result[0])
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
  this.fetchData = (url, success, failure) => {
    parentFetcher.apply(this, [url, success, failure]);
  }
}

class Transformer {
  cnstructor() {
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
  this.renderHeader = () => {}
  this.renderFooter = () => {}
  this.renderBody = () => {}
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

const objUrl = {
  FIVEDAYURL: `http://api.openweathermap.org/data/2.5/forecast?q=Izhevsk&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`,
  POLLUTION:`http://api.openweathermap.org/pollution/v1/co/56,53/current.json?appid=e2c078e26648e8e09b6e90e982007c80`,
  FIVEDAYSINFO2:`http://api.openweathermap.org/data/2.5/weather?q=Izhevsk&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`
}
///// Default
function init() {
  let fiveDayTransformer = new FiveDayTransformer()
  let fetcher = new FiveDayFetcher()
  fetcher.fetchData(objUrl.FIVEDAYURL, response => {
    let transformFive = fiveDayTransformer.transform(response)
    let renderer = new FiveDayRenderer()
    renderer.renderBody(transformFive)
  }, () => {
    console.log('fail')
  })

  let headerPollution_Transformer = new HeaderPollution_Transformer()
  let fetcher2 = new FiveDayFetcher()
  fetcher2.fetchData(objUrl.POLLUTION, response => {
    let result = headerPollution_Transformer.transform(response)
    let renderer2 = new PollutionRenderer()
    renderer2.renderHeader(result)
  }, () => {
    console.log('fail')
  })

  let currentDay_Transformer = new CurrentDay_Transformer()
  let fetcher3 = new FiveDayFetcher()
  fetcher3.fetchData(objUrl.FIVEDAYSINFO2, response => {
    let result = currentDay_Transformer.transform(response)
    let renderer3 = new CurrentDay_Renderer()
    renderer3.renderBody(result)
  }, () => {
    aconsole.log('fail')
  })
  renderDayOfWeek()
}

init()
///////EndDefault

document.getElementById('findCityInput').addEventListener("change", changeCity);

function changeCity() {

  let serchRequest = findCityInput.value;
  let fiveDaysInfo = `http://api.openweathermap.org/data/2.5/forecast?q=${serchRequest}&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
  let fiveDayTransformer = new FiveDayTransformer()
  let fetcher = new FiveDayFetcher()
  fetcher.fetchData(fiveDaysInfo, response => {
    let result = fiveDayTransformer.transform(response)
    let renderer = new FiveDayRenderer()
    renderer.renderBody(result)
    renderCity(serchRequest);
  }, () => {
    console.log('fail')
  })

  let pollution = `http://api.openweathermap.org/pollution/v1/co/56,53/current.json?appid=e2c078e26648e8e09b6e90e982007c80`;
  let headerPollution_Transformer = new HeaderPollution_Transformer()
  let fetcher2 = new FiveDayFetcher()
  fetcher2.fetchData(pollution, response => {
    let result = headerPollution_Transformer.transform(response)
    let renderer2 = new PollutionRenderer()
    renderer2.renderBody(result)
  }, () => {
    console.log('fail')
  })

  let fiveDaysInfo2 = `http://api.openweathermap.org/data/2.5/weather?q=${serchRequest}&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
  let currentDay_Transformer = new CurrentDay_Transformer()
  let fetcher3 = new FiveDayFetcher()
  fetcher3.fetchData(fiveDaysInfo2, response => {
    let result = currentDay_Transformer.transform(response)
    let renderer3 = new CurrentDay_Renderer()
    renderer3.renderBody(result)
  }, () => {
    console.log('fail')
  })
}

document.getElementById('header-findform').addEventListener('submit', event => {
event.preventDefault();
});