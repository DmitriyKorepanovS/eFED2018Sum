function loadArray() {
    var xhr = new XMLHttpRequest();
    var responsedata;
    xhr.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=Izhevsk,ru&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`, false);
    xhr.send();

    if (xhr.status != 200) {

      alert('Ошибка');
    } else {

      
    }
    return (responsedata = xhr.responseText);
  }
 
  loadArray()

 currentDayArray = loadArray()

  console.log(currentDayArray);

  var superArray = JSON.parse(currentDayArray)
  console.log(superArray);
  
  var currentTemperature = document.getElementById('text-style-big-temperature');

  console.log(currentTemperature.textContent = Math.round(superArray.main.temp) + `С`);
