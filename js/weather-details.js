var fiveDaysContainer = document.getElementById('weathertable-5days');
var elements = document.querySelectorAll('.time-of-day-temperature');
var classForDay = 'activex';
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
  var indexNext;
  for (var i = 0; i < elements.length; i++) {
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
  var indexPrevious;
  for (var i = 0; i < elements.length; i++) {

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

var buttonForDay = document.getElementById('buttonForDay');
var elementButtonDayOfWeek = document.querySelectorAll('.buttonDayOfWeek');
var classForChange = 'activeDay';


buttonForDay.addEventListener("click", switchButton);

function switchButton(event) {
  var index;
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

  var arrayProp = document.getElementById('weathertable-5days');
  var prop = arrayProp.querySelectorAll('.temperature-night');
  var arrayWind = document.getElementById('wind-speed-5days');
  var propWind = arrayWind.querySelectorAll('.wind-value');
  for (var i = 0; i < 20; i++) {
    prop[i].textContent = Math.round(renderData.temp[i + 1].main.temp);
    propWind[i].textContent = Math.round(renderData.temp[i + 1].wind.speed);
  }
}

function transformFiveDays(str) {
  var renderData = {
    temp: str.list
  };
  renderFiveDays(renderData);
}