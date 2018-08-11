function chessBoard(height, width){

	if (height % 2 == 0) { height = height/2}
    else {height = Math.floor(height/2) +1}

	for(var i = 0; i < height; i++){
	  i % 2 == 0 ? makeOddLine(width) : makeEvenLine(width);
  document.write('<br/>');
  }
}


function makeOddLine(width){
for(var i = 0; i < width; i++){
	  document.write((i % 2 == 1) ? '&nbsp;' : '#');
  }
}

function makeEvenLine(width){
for(var i = 0; i < width; i++){
	  document.write((i % 2 == 1) ? '#' : '&nbsp;');
  }
}
console.log(chessBoard(8,8));