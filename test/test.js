const { Collection } = require('../lib')

const collection = new Collection([
	["key1", 'value1'],
	["key2", 'value2'],
	["key3", 'value3'],
]);

console.log(collection.toJSON());