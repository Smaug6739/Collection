/**
 * This module is an utility for managing data in the form of Map.
 * github.com/Smaug6739/collection
 */

import type { IMap, IArray } from './typescript/interfaces';
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

	public get(key: K): V | undefined {
		return super.get(key)
	}

	public set(key: K, value: V): this {
		return super.set(key, value)
	}

	public has(key: K): boolean {
		return super.has(key)
	}
	public hasAllKeys(keys: K[]): boolean {
		return keys.every(k => this.has(k));
	}
	public hasAnyKey(keys: K[]): boolean {
		return keys.some((k) => this.has(k));
	}
	public delete(key: K): boolean {
		return super.delete(key)
	}

	public clear(): void {
		return super.clear()
	}

	public updateIf(data: IMap, filter: Function): this | null {
		if (!data.key || !data.value) throw new TypeError('[MISSING_PARAMETER] The data parameter must be specified with key and value property.');
		if (!filter) throw new TypeError('[MISSING_PARAMETER] The filter parameter must be specified.');
		for (const [k, v] of this) {
			if (filter(k, v)) {
				return this.set(data.key, data.value)
			}
		}
		return null;
	}
	public deleteIf(key: K, filter: Function): this | null {
		if (!key) throw new TypeError('[MISSING_PARAMETER] The key parameter must be specified with key and value property.');
		if (!filter) throw new TypeError('[MISSING_PARAMETER] The filter parameter must be specified.');
		for (const [k, v] of this) {
			if (filter(k, v)) {
				if (this.delete(key)) return this
			}
		}
		return null;
	}
	public isUnique(key: K): boolean {
		const valOne = this.get(key);
		if (!valOne) throw new TypeError('Cannot find value for key: ' + key);
		// for (const val of this.filter()) {
		// 	if (val === valOne) return false;
		// }

		if (this.filter((v: V) => v === valOne).size <= 1) return true
		return false;
	}
	public firstKey(): K | null {
		const firstKey = this.keys().next().value;
		if (firstKey) return firstKey;
		return null;
	}

	public first(): V | null {
		if (this.values().next().value) return this.values().next().value;
		return null;
	}

	public lastKey(): K | null {
		const arr = [...this.keys()];
		if (arr[arr.length - 1]) return arr[arr.length - 1];
		return null;
	}
	public last(): V | null {
		const arr = [...this.values()];
		if (arr[arr.length - 1]) return arr[arr.length - 1];
		return null;
	}

	public randomKey(): K | null {
		const keys = [...this.keys()];
		if (!keys.length) return null;
		const random = Math.floor(Math.random() * keys.length);
		const key = keys[random];
		return key
	}
	public random(): V | null {
		const keys = [...this.keys()];
		if (!keys.length) return null;
		const random = Math.floor(Math.random() * keys.length);
		const key = keys[random];
		return this.get(key) || null
	}
	public find(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): V | null {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		for (const [key, val] of this) {
			if (fn(val, key, this)) return val;
		}
		return null;
	}

	public isEmpty(): boolean {
		const first = this.first();
		if (!first) return true;
		return false;
	}

	public copy(): Collection<K, V> {
		return new this.constructor[Symbol.species](this);
	}

	filter(f: Function): Collection<K, V> {
		const newCollection = new this.constructor[Symbol.species]<K, V>();
		for (const [k, v] of this) {
			if (f(v, k)) newCollection.set(k, v);
		}
		return newCollection;
	}


	public keysList(): K[] | null {
		const list: K[] = [];
		for (const k of this.keys()) {
			list.push(k);
		}
		if (list) return list;
		return null;
	}

	public valuesList(): V[] | null {
		const list: V[] = [];
		for (const v of this.values()) {
			list.push(v);
		}
		if (list) return list;
		return null;
	}

	public merge(...maps: Array<Collection<K, V> | Map<K, V>>): Collection<K, V> {
		for (const map of maps) {
			for (const [k, v] of map) {
				this.set(k, v)
			}
		}
		return this;
	}

	public concat(...maps: Array<Collection<K, V> | Map<K, V>>): Collection<K, V> {
		const newCollection = this.copy();
		for (const map of maps) {
			for (const [k, v] of map) {
				newCollection.set(k, v)
			}
		}
		return newCollection;
	}

	public toArray(): Array<IArray> | null {
		const that: this = this;
		if (that == null) return that as null;
		const newArray = [];
		for (const [k, v] of that) {
			newArray.push({
				key: k,
				value: v
			});
		}
		return newArray;
	}
	public toJSON(): any {
		const obj = Object.fromEntries(this);
		return obj
	}

	public each(fn: (value: V, key: K, collection: this) => void, thisArg?: unknown): this {
		this.forEach(fn as (value: V, key: K, map: Map<K, V>) => void, thisArg);
		return this;
	}
}

export { Collection }
