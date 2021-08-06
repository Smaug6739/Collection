# Collection

This module is an utility for managing data in the form of Map.

## Usage

Create a new Collection with optional data has a parameter.

Parameters :

- data : Array of data to be added to the collection.
  - type : Array<\Array\<string|number, data>>
  - optional : Yes

```js
const collection = new Collection([
  ["key1", value1],
  ["key2", value2],
  ["key3", value3],
]);
```

## Methods

---

## get(key)

Get a value from the collection by name of key.

Parameters :

- key : The name of the key to get value from the collection (string).

Returns :

The value of the key in the collection.

Type : any

```js
collection.get("key1");
```

## set(key, value)

Set a value in the collection.

Parameters :

- key : The name of the key to add (string).
- value : The value to set (any).

Returns :

The Map object.

Type : object

```js
collection.set("key2", value2);
```

## hasKey(key)

Check if a key exists in the collection.

Parameters :

- key : The key to check.

Returns :

True if the key exists in the collection.

Type : boolean

```js
collection.hasKey("key1"); // true
```

## hasAllKeys(keys)

Check if all keys exists in the collection.

Parameters :

- keys : The name of the keys to check (Array\<string>).

Returns :

True if the keys exists in the collection.

Type : boolean

```js
collection.hasAllKeys(["key1", "key2"]);
```

## hasAnyKey(key)

Check if at least one key exists in the collection.

Parameters :

- keys : The name of the keys to check (Array\<string>).

Returns :

True if one key exists in the collection.

Type : boolean

```js
collection.hasAnyKey(["key1", "key2"]);
```

## delete(key)

Delete a value from the collection by name of key.

Parameters :

- key : The name of the key to delete from the collection (string).

Returns :

The value of the key in the collection.

Type : any

```js
collection.delete("key1");
```

## clear()

Clear all values from the collection.

Parameters :

None

Returns :

Undefined.

Type : undefined

```js
collection.clear();
```

## updateIf(data, filter)

Update value from the collection if the filter returns true for at least one item of collection.

Parameters :

- data : Object with a key and value keys (key of item and newValue).
- filter : Function with in parameters key and value.

Returns :

Undefined

Type : undefined

```js
const filter = (k, v) => k === "key1";
collection.updateIf({ key: "key1", value: newValue }, filter);
```

## deleteIf(key, filter)

Delete value from the collection if the filter returns true for at least one item of collection.

Parameters :

- key : Object with a key and value keys (key of item and newValue).
- filter : Function with in parameters key and value.

Returns :

Undefined

Type : undefined

```js
const filter = (k, v) => k === "key1";
collection.deleteIf("key1", filter);
```

## isUnique(key)

Check if in the collection an othen element have the value of item of key.

Parameters :

- key : The name of the key to check (string).

Returns :

True if value of this item is unique in the collection.

Type : boolean

```js
collection.isUnique("key1");
```

## first()

Get the first element of the collection.

Parameters :

None

Returns :

The value of the first element in the collection.

Type : any

```js
collection.first();
```

## firstKey()

Get the key of first element of the collection.

Parameters :

None

Returns :

The key of the first element in the collection.

Type : string

```js
collection.firstKey();
```

## last()

Get the last element of the collection.

Parameters :

None

Returns :

The value of the last element in the collection.

Type : any

```js
collection.last();
```

## lastKey()

Get the key of last element of the collection.

Parameters :

None

Returns :

The key of the last element in the collection.

Type : string

```js
collection.lastKey();
```

## randomKey()

Get a random key from the collection.

Parameters :

None

Returns :

The random key of the collection.

Type : string

```js
collection.randomKey();
```

## random()

Get a random value from the collection.

Parameters :

None

Returns :

The random value of the collection.

Type : string

```js
collection.random();
```

## find(function)

Search value in collection.

Parameters :

- function : The function to search with value and key as a parameter.

Returns :

The values.

Type : any

```js
collection.find((v) => (v.property = value));
```

## isEmpty()

Check if the collection is empty.

Parameters :

None

Returns :

True if the collection is empty.

Type : boolean

```js
collection.isEmpty();
```

## copy()

Get a copie of the collection.

Parameters :

None

Returns :

The collection.

Type : any

```js
collection.copy();
```

## filter(function)

Return the values where the function returns true in the collection.

Parameters :

- function : Function with in parameters the value and the key.

Returns :

The values.

Type : any

```js
collection.filter((v, k) => {
  v.property === other;
});
```

## keysList()

Get a list of keys in the collection.

Parameters :

None

Returns :

An arrays of keys of the collection.

Type : Array\<string>

```js
collection.keysList();
```

## valuesList()

Get a list of values in the collection.

Parameters :

None

Returns :

An arrays of values of the collection.

Type : Array\<string>

```js
collection.valuesList();
```

## merge(other)

Merge an other collection or Map with this collection.

Parameters :

- other : A collection or a Map

Returns :

The new collection merged

Type : Collection

```js
collection.merge(other);
```

## concat(other)

Concat map or collection to this collection.

Parameters :

- other : A collection or a Map

None

Returns :

Undefined

Type : undefined

```js
collection.valuesList();
```

## toArray()

Convert the collection to an array.

Parameters :

None

Returns :

An arrays of the collection.

Type : Array\<{key:string, value:any}>

```js
collection.toArray();
```

## toJson()

Convert the collection to json.

Parameters :

None

Returns :

The collection as json.

Type : Json

```js
collection.toJson();
```
