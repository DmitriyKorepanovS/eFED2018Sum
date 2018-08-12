function deepCompare(object1, object2) {

	var count1 = 0,
		count2 = 0;
	for (var key in object1) {
		count1++;
	}
	for (var key in object2) {
		count2++;
	}
	if (count1 != count2) {
		return false;
	}

	for (var key in object1) {
		if (object1[key] !== object2[key]) {
			return false;
		}
	}

	return true;
}

console.log (deepCompare ( {one:1, two:`2`} , {one:1, two: `2`}));

console.log (deepCompare ({one:1, two:`2`} , { two: 2}));

console.log (deepCompare ({one:1, two:`2`} , { one:1, two: 2}));

console.log (deepCompare ( {one:1, two:`2`} , { two: `2`, one:1 }));

