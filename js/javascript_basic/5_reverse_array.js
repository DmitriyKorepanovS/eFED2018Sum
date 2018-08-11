function reverseArray(array) {
	var newArray = array,
		buffer;
	for (i = 0, j = newArray.length - 1; i < j; i++, j--) {
		buffer = newArray[j];
		newArray[j] = newArray[i];
		newArray[i] = buffer;
	}
	return newArray;
}

console.log(reverseArray([1,2,3,4]));




var array = ['A', 'B', 'C', 'D'];

function reverseArrayInPlace(array) {
	var i = 0;
	while (i < array.length - 1) {
		array.splice(i, 0, array.pop());
		i++;
	}
	return (array);
}

reverseArrayInPlace(array);
console.log (array);