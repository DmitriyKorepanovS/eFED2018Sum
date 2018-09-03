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