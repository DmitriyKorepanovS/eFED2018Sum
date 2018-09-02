var fiveDaysContainer = document.getElementById('weathertable-5days');
var elements = document.querySelectorAll('.time-of-day-temperature');

fiveDaysContainer.addEventListener ("click", switchInfo );

function switchInfo (event) {
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
    if (elements[i].classList.contains('activex')) {
      elements[i].classList.remove('activex')

      if (i === elements.length - 1) {
        elements[0].classList.add('activex')
        indexNext = 0;
        break
      }
      indexNext = i + 1;
      elements[indexNext].classList.add('activex')
      break
    }
  }
  showButton(indexNext)
}

function showPrevious() {
  var indexPrevious;
  for (var i = 0; i < elements.length; i++) {

    if (elements[i].classList.contains('activex')) {
      elements[i].classList.remove('activex')

      if (i === 0) {
        elements[elements.length - 1].classList.add('activex');
        indexPrevious = elements.length - 1;
        break
      }
      indexPrevious = i - 1;
      elements[indexPrevious].classList.add('activex')
      break
    }
  }
  showButton(indexPrevious)
}

var buttonForDay = document.getElementById('buttonForDay');
var elementButtonDayOfWeek = document.querySelectorAll('.buttonDayOfWeek');

buttonForDay.addEventListener ("click", switchButton );
 function switchButton (event) {
  if (event.target.className === 'buttonDayOfWeek') {
    for (var i = 0; i < elementButtonDayOfWeek.length; i++) {
      if (elementButtonDayOfWeek[i].classList.contains('activeDay')) {
        elementButtonDayOfWeek[i].classList.remove('activeDay')
      }
      event.target.classList.add('activeDay');
    }
    for (var i = 0; i < elementButtonDayOfWeek.length; i++) {
      if (elementButtonDayOfWeek[i].classList.contains('activeDay')) {
        var index = i;
      }
    }
    showDay(index);
  }
}

function showDay(index) {
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains('activex')) {
      elements[i].classList.remove('activex')
      elements[index].classList.add('activex')
      break
    }
  }
}

function showButton(position) {
  for (var i = 0; i < elementButtonDayOfWeek.length; i++) {
    if (elementButtonDayOfWeek[i].classList.contains('activeDay')) {
      elementButtonDayOfWeek[i].classList.remove('activeDay')
    }
  }
  elementButtonDayOfWeek[position].classList.add('activeDay');
}