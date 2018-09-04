var btnTemperatureProbabilityWind = document.getElementById('button-temperature-probability-wind');
var elementButtonrow = document.querySelectorAll('.buttonrow-button-noactive');

btnTemperatureProbabilityWind.addEventListener("click", switchButtonStatistic)

function switchButtonStatistic() {

  if (event.target.className === 'buttonrow-button-noactive') {
    showButton()
  }
}

function showButton() {
  for (var i = 0; i < elementButtonrow.length; i++) {
    if (elementButtonrow[i].classList.contains('buttonrow-button-active')) {
      elementButtonrow[i].classList.remove('buttonrow-button-active');

    }
    event.target.classList.add('buttonrow-button-active');
  }
  for (var i = 0; i < elementButtonrow.length; i++) {
    if (elementButtonrow[i].classList.contains('buttonrow-button-active')) {
      var indexDiv = i;
    }
  }
  showSection(indexDiv)
}

var section = document.querySelectorAll('.probability-of-precipitation');

function showSection(indexDiv) {
  for (var i = 0; i < section.length; i++) {
    if (section[i].classList.contains('activeSection')) {
      section[i].classList.remove('activeSection')
      section[indexDiv].classList.add('activeSection')
      break
    }
  }
}
