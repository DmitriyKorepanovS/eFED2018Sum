var BtnTemperatureProbabilityWind = document.getElementById('button-temperature-probability-wind');
var elementButtonrow = document.querySelectorAll('.buttonrow-button-noactive');

BtnTemperatureProbabilityWind.addEventListener("click", switchButtonStatistic)

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

var Section = document.querySelectorAll('.probability-of-precipitation');

function showSection(indexDiv) {
  for (var i = 0; i < Section.length; i++) {
    if (Section[i].classList.contains('activeSection')) {
      Section[i].classList.remove('activeSection')
      Section[indexDiv].classList.add('activeSection')
      break
    }
  }
}
