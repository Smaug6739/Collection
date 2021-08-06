/**
 * This module is an utility for managing data in the form of Map.
 * github.com/Smaug6739/collection
 */

import type { IMap } from './typescript/interfaces';
export interface CollectionConstructor {
	new(): Collection<unknown, unknown>;
	new <K, V>(entries?: ReadonlyArray<readonly [K, V]> | null): Collection<K, V>;
	new <K, V>(iterable: Iterable<readonly [K, V]>): Collection<K, V>;
	readonly prototype: Collection<unknown, unknown>;
	readonly [Symbol.species]: CollectionConstructor;
}
class Collection<K, V> extends Map<K, V> {
	public static readonly default: typeof Collection = Collection;
	public ['constructor']: CollectionConstructor;

	constructor(data?: any) {
		super(data)
	}

	public get(key: K) {
		return super.get(key)
	}

	public set(key: K, value: V) {
		return super.set(key, value)
	}

	public hasKey(key: K) {
		return super.has(key)
	}
	public hasAllKeys(...keys: K[]): boolean {
		return keys.every(k => this.hasKey(k));
	}
	public hasAnyKey(...keys: K[]): boolean {
		return keys.some((k) => this.has(k));
	}
	public delete(key: K) {
		return super.delete(key)
	}

	public clear() {
		return super.clear()
	}

	public updateIf(data: IMap, filter: Function) {
		if (!data.key || !data.value) throw new TypeError('[MISSING_PARAMETER] The data parameter must be specified with key and value property.');
		if (!filter) throw new TypeError('[MISSING_PARAMETER] The filter parameter must be specified.');
		for (const [k, v] of this) {
			if (filter(k, v)) {
				this.set(data.key, data.value)
				break;
			}
		}

	}
	public deleteIf(key: K, filter: Function) {
		if (!key) throw new TypeError('[MISSING_PARAMETER] The key parameter must be specified with key and value property.');
		if (!filter) throw new TypeError('[MISSING_PARAMETER] The filter parameter must be specified.');
		if (filter(this.toArray())) {
			this.delete(key)
		}
	}
	public isUnique(key: K) {
		// Return true if the collection does not contain this value has another place
		const valOne = this.get(key);
		if (!valOne) throw new TypeError('Cannot find value for key: ' + key);
		for (const val of this.values()) {
			if (val === valOne) return false;
		}
		return true;
	}
	public first() {
		if (this.values().next().value) return this.values().next().value;
		return null;
	}
	public firstKey(): K | null {
		const firstKey = this.keys().next().value;
		if (firstKey) return firstKey;
		return null;
	}

	public last() {
		const arr = [...this.values()];
		if (arr[arr.length - 1]) return arr[arr.length - 1];
		return null;
	}

	public lastKey(): K | null {
		const arr = [...this.keys()];
		if (arr[arr.length - 1]) return arr[arr.length - 1];
		return null;
	}

	public randomKey(): K {
		const keys = [...this.keys()];
		const random = Math.floor(Math.random() * keys.length);
		const key = keys[random];
		return key
	}
	public random() {
		const keys = [...this.keys()];
		const random = Math.floor(Math.random() * keys.length);
		const key = keys[random];
		return this.get(key)
	}
	public find(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): V | undefined {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		for (const [key, val] of this) {
			if (fn(val, key, this)) return val;
		}
		return undefined;
	}

	public isEmpty() {
		const first = this.first();
		if (!first) return true;
		return false;
	}

	public copy(): Collection<K, V> {
		return new this.constructor[Symbol.species](this);
	}

	filter(f: Function) {
		const newCollection = new Collection();
		for (const [k, v] of this) {
			if (f(v, k)) newCollection.set(k, v)
		}
		return true;
	}


	public keysList() {
		const list: K[] = [];
		for (const k of this.keys()) {
			list.push(k);
		}
		if (list) return list;
		return null;
	}

	public valuesList() {
		const list: V[] = [];
		for (const v of this.values()) {
			list.push(v);
		}
		if (list) return list;
		return null;
	}

	public merge(...maps: Array<Collection<K, V> | Map<K, V>>) {
		for (const map of maps) {
			for (const [k, v] of map) {
				this.set(k, v)
			}
		}
		return this;
	}

	public concat(...maps: Array<Collection<K, V> | Map<K, V>>) {
		const newCollection = this.copy();
		for (const map of maps) {
			for (const [k, v] of map) {
				newCollection.set(k, v)
			}
		}
		return newCollection;
	}

	public toArray() {
		const that: this = this;
		if (that == null) {
			return that;
		}
		const newArray = [];
		for (const [k, v] of that) {
			newArray.push({
				key: k,
				value: v
			});
		}
		return newArray;
	}
	public toJSON() {
		const obj = Object.fromEntries(this);
		return obj
	}

	public each(fn: (value: V, key: K, collection: this) => void, thisArg?: unknown): this {
		this.forEach(fn as (value: V, key: K, map: Map<K, V>) => void, thisArg);
		return this;
	}
}
export { Collection }