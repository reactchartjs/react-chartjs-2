let hasOwnProperty = Object.prototype.hasOwnProperty;

const is = (x, y) => {
	// SameValue algorithm
	if (x === y) {
		// Steps 1-5, 7-10
		// Steps 6.b-6.e: +0 != -0
		return x !== 0 || 1 / x === 1 / y;
	} else {
		// Step 6.a: NaN == NaN
		return x !== x && y !== y;
	}
};

const deepEqual = (objA, objB) => {
	if (is(objA, objB)) {
		return true;
	}

	if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
		return false;
	}

	let keysA = Object.keys(objA);

	// Test for A's keys different from B.
	for (let i = 0; i < keysA.length; i++) {
		if (!hasOwnProperty.call(objB, keysA[i])) {
			return false;
		}
	}

	for (let propty in objA) {
		if (objB.hasOwnProperty(propty)) {
			if (!deepEqual(objA[propty], objB[propty])) {
				return false;
			}
		}
		else {
			return false;
		}
	}

	return true;
};

export default deepEqual;
