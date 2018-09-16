
var timerId = setInterval(function() {
  alert( "one" );
  alert( "two" );
  alert( "three" );
  alert( "four" );
  alert( "five" );
}, 2000);


setTimeout(function() {
  clearInterval(timerId);
  alert( 'stop' );
}, 6000);