import type { IMap } from './typescript/interfaces';
export interface CollectionConstructor {
    new (): Collection<unknown, unknown>;
    new <K, V>(entries?: ReadonlyArray<readonly [K, V]> | null): Collection<K, V>;
    new <K, V>(iterable: Iterable<readonly [K, V]>): Collection<K, V>;
    readonly prototype: Collection<unknown, unknown>;
    readonly [Symbol.species]: CollectionConstructor;
}
declare class Collection<K, V> extends Map<K, V> {
    static readonly default: typeof Collection;
    ['constructor']: CollectionConstructor;
    get(key: K): V;
    set(key: K, value: V): this;
    hasKey(key: K): boolean;
    hasAllKeys(...keys: K[]): boolean;
    hasAnyKey(...keys: K[]): boolean;
    delete(key: K): boolean;
    clear(): void;
    updateIf(data: IMap, filter: Function): void;
    deleteIf(key: K, filter: Function): void;
    isUnique(key: K): boolean;
    first(): any;
    firstKey(): K | null;
    last(): V;
    lastKey(): K | null;
    randomKey(): K;
    random(): V;
    find(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): V | undefined;
    isEmpty(): boolean;
    copy(): Collection<K, V>;
    filter(f: Function): boolean;
    keysList(): K[];
    valuesList(): V[];
    merge(...maps: Array<Collection<K, V> | Map<K, V>>): this;
    concat(...maps: Array<Collection<K, V> | Map<K, V>>): Collection<K, V>;
    toArray(): any[] | this;
    toJSON(): V[];
    each(fn: (value: V, key: K, collection: this) => void, thisArg?: unknown): this;
}
export {};
