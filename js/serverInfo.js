class Page {
  constructor() {
    this.defaultUrl =`http://api.openweathermap.org/data/2.5/forecast?q=Izhevsk&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`
     
    
  }

  init(defaultUrl) {
    defaultUrl = this.defaultUrl;
    console.log(defaultUrl)
    this.getElements();
    this.subscribe();

    this.fetchData(defaultUrl)
    .then(data => {
     this.transformData(data);
     })
     .then(transformedData => this.renderData(transformedData))
  }

  getElements() {
    this.header = document.getElementById('findCityInput');
  }

  subscribe() {
    document.getElementById('header-findform').addEventListener('submit', function (event) {
      event.preventDefault();
    });

    this.header.addEventListener("change", this.prepareToFetching);
  }

  prepareToFetching(inputValue) {
  
    var inputValue = this.value;
    let finalURl = { url1: `http://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`,
    url2: `http://api.openweathermap.org/pollution/v1/co/56,53/current.json?appid=e2c078e26648e8e09b6e90e982007c80`,
    url3: `http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&APPID=e2c078e26648e8e09b6e90e982007c80`
  }
  console.log (this)

     return [finalURl.url1, finalURl.url2, finalURl.url3].map(url => this.fetchData(url));
  }


  fetchData(url) {
    console.log ('HI   '+ url);
   return fetch(url);
    
  }

  renderData (someData) {
    console.log ('отрисовка')
    // innerHtml = "<div>123</div>"
  }

  transformData(data) {
console.log (data)
  }

 
  refreshData(inputTest) {
    const data = this.prepareToFetching(inputValue);
    this.render(data);
  }

  unsub() {
    // this.header.removeListener
  }
}



const page = new Page();
page.init();