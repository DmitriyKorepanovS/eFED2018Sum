const fiveDaysContainer = document.getElementById('weathertable-5days');
const elements = document.querySelectorAll('.time-of-day-temperature');
const classForDay = 'activex';
fiveDaysContainer.addEventListener("click", switchInfo);

function switchInfo(event) {
  if (event.target.className === 'btnNext') {
    showNext()
  }
  if (event.target.className === 'btnPrevious') {
    showPrevious()
  }
}

function showNext() {
  let indexNext;
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains(classForDay)) {
      elements[i].classList.remove(classForDay)

      if (i === elements.length - 1) {
        elements[0].classList.add(classForDay)
        indexNext = 0;
        break
      }
      indexNext = i + 1;
      elements[indexNext].classList.add(classForDay)
      break
    }
  }
  showButton(indexNext)
}

function showPrevious() {
  let indexPrevious;
  for (let i = 0; i < elements.length; i++) {

    if (elements[i].classList.contains(classForDay)) {
      elements[i].classList.remove(classForDay)

      if (i === 0) {
        elements[elements.length - 1].classList.add(classForDay);
        indexPrevious = elements.length - 1;
        break
      }
      indexPrevious = i - 1;
      elements[indexPrevious].classList.add(classForDay)
      break
    }
  }
  showButton(indexPrevious)
}

const buttonForDay = document.getElementById('buttonForDay');
const elementButtonDayOfWeek = document.querySelectorAll('.buttonDayOfWeek');
const classForChange = 'activeDay';


buttonForDay.addEventListener("click", switchButton);

function switchButton(event) {
  let index;
  if (event.target.className === 'buttonDayOfWeek') {
    for (let i = 0; i < elementButtonDayOfWeek.length; i++) {
      if (elementButtonDayOfWeek[i].classList.contains(classForChange)) {
        elementButtonDayOfWeek[i].classList.remove(classForChange)
      }
      event.target.classList.add(classForChange);
    }
    for (let i = 0; i < elementButtonDayOfWeek.length; i++) {
      if (elementButtonDayOfWeek[i].classList.contains(classForChange)) {
        index = i;
      }
    }
    showDay(index);
  }
}

function showDay(index) {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains(classForDay)) {
      elements[i].classList.remove(classForDay)
      elements[index].classList.add(classForDay)
      break
    }
  }
}

function showButton(position) {
  for (let i = 0; i < elementButtonDayOfWeek.length; i++) {
    if (elementButtonDayOfWeek[i].classList.contains(classForChange)) {
      elementButtonDayOfWeek[i].classList.remove(classForChange)
      break
    }
  }
  elementButtonDayOfWeek[position].classList.add(classForChange);
}


let findCityInput = document.getElementById('findCityInput');
findCityInput.addEventListener("change", changeCity);

document.getElementById('header-findform').addEventListener('submit', function (event) {
  event.preventDefault();
});

function changeCity() {

  let serchRequest = findCityInput.value;
  let fiveDaysInfo = `http://api.openweathermap.org/data/2.5/forecast?q=${serchRequest}&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
  renderCity(serchRequest);
  serchRequest = `http://api.openweathermap.org/data/2.5/weather?q=${serchRequest}&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
  loadArray(transformFiveDays, fiveDaysInfo)
  loadArray(transformRain, fiveDaysInfo)
  loadArray(transformCurrentDay, serchRequest)
}

function init() {
  let serchRequest = 'Izhevsk';
  let fiveDaysInfo = `http://api.openweathermap.org/data/2.5/forecast?q=${serchRequest}&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
  renderCity(serchRequest);
  serchRequest = `http://api.openweathermap.org/data/2.5/weather?q=${serchRequest}&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
  loadArray(transformFiveDays, fiveDaysInfo)
  loadArray(transformRain, fiveDaysInfo)
  loadArray(transformCurrentDay, serchRequest)
}


function renderCity(renderData) {
  let currentCityMain = document.getElementById('currentCityMain');
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
      console.log('fail')
    })
}

function renderFiveDays(renderData) {
  const arrayProp = document.getElementById('weathertable-5days');
  const prop = arrayProp.querySelectorAll('.temperature-night');
  const arrayWind = document.getElementById('wind-speed-5days');
  const propWind = arrayWind.querySelectorAll('.wind-value');
  const icon5Days = arrayProp.querySelectorAll('.icon-5-days');

  for (let i = 0; i < 20; i++) {
    prop[i].textContent = Math.round(renderData.temp[i + 1].main.temp);
    propWind[i].textContent = Math.round(renderData.temp[i + 1].wind.speed);

    let iconChange = renderData.temp[i * 2].weather[0].description;
    icon5Days[i].setAttribute('src', `images/${iconChange}.png`);
  }

  const SHORT_NAMES_WEEK = getShortNamesDays();
  let nowDate = new Date();
  let start = nowDate.getDay();
  let currentdate = nowDate.getDate();

  for (let i = 0; i < 5; i++) {
    document.querySelectorAll('.day-of-week')[i].textContent = SHORT_NAMES_WEEK[i + start] + ',  ' + (currentdate + i);
    document.querySelectorAll('.day1')[i].textContent = SHORT_NAMES_WEEK[i + start] + ',  ' + (currentdate + i);
    document.querySelectorAll('.day2')[i].textContent = SHORT_NAMES_WEEK[i + start] + ',  ' + (currentdate + i);
  }

  document.getElementById('currentdate').textContent = currentdate;

}

function  renderCurrentDay (renderData) {
let sunrise = renderData.sunrise;
let sunset =  renderData.sunset;
let date = new Date(sunrise * 1000);
let date2 = new Date(sunset * 1000);

let timestr = date.toLocaleTimeString();
let timeSun = date2.toLocaleTimeString()
document.getElementById('sunrise').textContent = timestr;
document.getElementById('sunset').textContent = timeSun;
document.getElementById('sunsetMoon').textContent = timestr;
document.getElementById('sunriseMoon').textContent = timeSun;
let iconWeather = renderData.icon;
document.getElementById('header-image-cloudy').setAttribute('src', `images/${iconWeather}.png`);
}

function renderRain(renderData) {
  for (let i = 0; i < 20; i++) {
    document.querySelectorAll('.valueRain')[i].textContent = Math.round(renderData[i].rain*10)/10;
  }
}

function transformFiveDays(str) {
  let renderData = {
    temp: str.list
  };
  renderFiveDays(renderData);
}

function transformCurrentDay(str) {
  
  let renderData = {
    sunrise: str.sys.sunrise,
    sunset: str.sys.sunset,
    icon: str.weather[0].description
  };
  renderCurrentDay(renderData);
}

function transformRain(str) {
  var list = str.list;
  let arrray = [];
  for (var i = 0; i < list.length; i += 2) {
    let item = list[i];
    arrray.push({
      rain: ('rain' in item && '3h' in item.rain) ? item.rain['3h'] : 0
    });
  }

  renderRain(arrray);
}

function getShortNamesDays() {
  const DAYS_WK_SHORT = ['Вc', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб',
    'Вc', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб',
    'Вc', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
  ];
  return DAYS_WK_SHORT
}

init()