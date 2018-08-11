function deepCompare(object1, object2) {
	if (object1.one === object2.one & object1.two === object2.two) {
		return true;
	} else {
		return false;
	}
}

console.log (deepCompare ( {one:1, two:`2`} , {one:1, two: `2`}));

console.log (deepCompare ({one:1, two:`2`} , { two: 2}));

console.log (deepCompare ({one:1, two:`2`} , { one:1, two: 2}));

console.log (deepCompare ( {one:1, two:`2`} , { two: `2`, one:1 }));

