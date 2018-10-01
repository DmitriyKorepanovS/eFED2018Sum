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
    for (var i = 0; i < elementButtonDayOfWeek.length; i++) {
      if (elementButtonDayOfWeek[i].classList.contains(classForChange)) {
        elementButtonDayOfWeek[i].classList.remove(classForChange)
      }
      event.target.classList.add(classForChange);
    }
    for (var i = 0; i < elementButtonDayOfWeek.length; i++) {
      if (elementButtonDayOfWeek[i].classList.contains(classForChange)) {
        index = i;
      }
    }
    showDay(index);
  }
}

function showDay(index) {
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains(classForDay)) {
      elements[i].classList.remove(classForDay)
      elements[index].classList.add(classForDay)
      break
    }
  }
}

function showButton(position) {
  for (var i = 0; i < elementButtonDayOfWeek.length; i++) {
    if (elementButtonDayOfWeek[i].classList.contains(classForChange)) {
      elementButtonDayOfWeek[i].classList.remove(classForChange)
      break
    }
  }
  elementButtonDayOfWeek[position].classList.add(classForChange);
}


var findCityInput = document.getElementById('findCityInput');
findCityInput.addEventListener("change", changeCity);

document.getElementById('header-findform').addEventListener('submit', function (event) {
  event.preventDefault();
});

function changeCity() {


  var serchRequest = findCityInput.value;
  var fiveDaysInfo = `http://api.openweathermap.org/data/2.5/forecast?q=${serchRequest}&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
  renderCity(serchRequest);
  serchRequest = `http://api.openweathermap.org/data/2.5/weather?q=${serchRequest}&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`;
  loadArray(transformFiveDays, fiveDaysInfo)

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

function renderFiveDays(renderData) {
 
  const arrayProp = document.getElementById('weathertable-5days');
  const prop = arrayProp.querySelectorAll('.temperature-night');
  const arrayWind = document.getElementById('wind-speed-5days');
  const propWind = arrayWind.querySelectorAll('.wind-value');
  const icon5Days = arrayProp.querySelectorAll('.icon-5-days');

 const rainfall5days = document.getElementById('weathertable-rainfall-5days');
 const selectValueRain = rainfall5days.querySelectorAll('.valueRain');
// const selectStyleImage = rainfall5days.querySelectorAll('.style-image');

  for (var i = 0; i < 20; i++) {
    prop[i].textContent = Math.round(renderData.temp[i + 1].main.temp);
    propWind[i].textContent = Math.round(renderData.temp[i + 1].wind.speed);

    let iconChange = renderData.temp[i * 2].weather[0].description;
    icon5Days[i].setAttribute('src', `images/${iconChange}.png`);

   selectValueRain[i].textContent = Math.round(renderData.temp[i + 1].main.temp);
   //selectStyleImage[i].style.height = Math.round(renderData.temp[i + 4].main.temp *2) + "px";
  }


  const SHORT_NAMES_WEEK = getShortNamesDays();
  const DAYS_OF_WEEK = arrayProp.querySelectorAll('.day-of-week');
  

  let nowDate = new Date();
  let start = nowDate.getDay();
  let currentdate = nowDate.getDate();

  for (let i = 0; i < 5; i++) {
    DAYS_OF_WEEK[i].textContent = SHORT_NAMES_WEEK[i + start] + '  ' + (currentdate + i);
  }

  let select_currentdate = document.getElementById('currentdate');
  select_currentdate.textContent = currentdate;
 
}

function transformFiveDays(str) {
  let renderData = {
    temp: str.list
  };
  renderFiveDays(renderData);
}

function getShortNamesDays() {
  const DAYS_WK_SHORT = ['Вc', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб',
    'Вc', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб',
    'Вc', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'
  ];
  return DAYS_WK_SHORT
}
