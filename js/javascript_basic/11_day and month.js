function getNames(date) {
  var days = ['Sunday', 'Mondey', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var month = [`january`, `february`, `march`, `april`, `may`, `june`, `july`, `augest`, `september`, `october`, `november`, `december`];
  var result;
  
  result = month[date.getMonth()] + `,` + days[date.getDay()];
  return result;
}

console.log(getNames(new Date(2018, 7, 17)));