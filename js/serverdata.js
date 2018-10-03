class Presenter {
    constructor() {
        this.options = {
            FIVE_DAY_URL: `http://api.openweathermap.org/data/2.5/forecast?q=Izhevsk&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`,
            POLLUTION: `http://api.openweathermap.org/pollution/v1/co/56,53/current.json?appid=e2c078e26648e8e09b6e90e982007c80`,
            FIVE_DAYS_INFO2: `http://api.openweathermap.org/data/2.5/weather?q=Izhevsk&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`
        };
    }

    renderFiveDays(renderData) {
        const obj = {
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

        const SHORT_NAMES_WEEK = this.getShortNamesDays();
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

    renderCurrentDay(renderData) {
        document.getElementById('humidity').textContent = `${renderData.humidity}%`;
        document.getElementById('precipitation').textContent = `${renderData.humidity - 16}%`;
        document.getElementById('text-style-big-temperature').textContent = `${Math.round(renderData.temp)}С`;
        document.getElementById('wind').textContent = renderData.wind;

        let iconWeather = renderData.icon;
        document.getElementById('pictureCurrentWeather').setAttribute('src', `images/${iconWeather}.png`);
    }

    renderCity(renderData) {
        document.getElementById('currentCityMain').textContent = renderData;
    }

    renderHeaderPollution(renderData) {
        document.getElementById('pollution').textContent = Math.round(renderData.data * 10000000) / 10000000;
    }

    getData(url) {
        //console.log(url)
        return fetch(url).then(result => {
            return result.json();
        });
    }

    pollutionFormatter(obj) {
        // console.log(obj)
        return {
            data: obj.data[36].value
        };
    }

    FiveDayFormatter(obj) {
        return {
            temp: obj.list
        };
    }

    CurrentDayFormatter(obj) {
        return {
            temp: obj.main.temp,
            humidity: obj.main.humidity,
            wind: obj.wind.speed,
            icon: obj.weather[0].description
        };
    }

    getFiveDaysWeather() {
        this.getData(this.options.FIVE_DAY_URL).then(res => {
            let transformFive = this.FiveDayFormatter(res);
            this.renderFiveDays(transformFive);
        });
    }

    getPoluutionWeather() {
        this.getData(this.options.POLLUTION).then(res => {
            let result = this.pollutionFormatter(res);
            this.renderHeaderPollution(result);
        })
    }

    getCurrentWeather() {
        this.getData(this.options.FIVE_DAYS_INFO2).then(res => {
            let result = this.CurrentDayFormatter(res);
            this.renderCurrentDay(result);
        })
    }

    init() {
        document.getElementById('header-findform').addEventListener('submit', event => {
            event.preventDefault();

            document.getElementById('findCityInput').addEventListener("change", changeCity)
        });
    }

    getNamesDays(date) {
        const NAMEDAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        return NAMEDAYS[date.getDay()];
    }

    getShortNamesDays() {
        return ['Вc', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вc', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вc', 'Пн'];
    }

    renderDayOfWeek() {
        let nowDate = new Date();
        document.getElementById('dayOfWeek').textContent = this.getNamesDays(nowDate);
    }

    refreshData(inputTest) {}

};


const presenter = new Presenter();
presenter.init();
presenter.getPoluutionWeather();
presenter.getCurrentWeather();
presenter.getFiveDaysWeather();
presenter.renderDayOfWeek()