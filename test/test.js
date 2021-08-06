// const arr = [1, 2, 3, 4, 5];

// function fil(f) {
// 	const r = [];
// 	arr.forEach(function (x) {
// 		if (f(x)) r.push(x);
// 	})
// 	return r
// }

// console.log(fil(c => c > 1))

const map = new Map();
map.set('a', 'b')
map.set('c', 'd')
map.set('e', 'f')
const sortFunction = (a, b) => a + b;

const tupleArray = [];
for (const key in map) tupleArray.push([key, map[key]]);
tupleArray.sort(function (a, b) {
	return b[1] - a[1]
});
const sortedMap = {};
tupleArray.forEach(function (el) {
	sortedMap[el[0]] = el[1]
});
console.log(tupleArray);