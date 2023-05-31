import type {
  ArrayElement,
  EmptyObj,
  KeysMatching,
  KeysOfArrays,
  Obj,
  ObjectKey,
  ArrayPredicate,
  Arr,
} from '../../TypeUtils';
import type { $MapAPI } from '../Map';
import type { $StrAPI } from '../Str';

/** */
export type CastedArray<K extends ObjectKey, T extends Record<K, unknown> & Obj> =
  T[K] extends readonly unknown[]
  ? ArrayElement<T[K]> extends infer S extends Obj
  ? S : never
  : never;

export type DoubleCastedArray<K extends ObjectKey, T extends Record<K, unknown>, KK extends KeysOfArrays<CastedArray<K, T>>> =
  CastedArray<KK, CastedArray<K, T>>;

/** */
export interface $ArrayPrototypeAPI<T> {
  /** */
  readonly length: number;
  /** */
  at (position: number): T | null;
  /** */
  map<R> (mapper: (...args: ArrayPredicate<T>) => R): $ArrayAPI<R>;
  /** */
  filter (filter: (...args: ArrayPredicate<T>) => boolean): $ArrayAPI<T>;
  /** */
  find (predicate: (...args: ArrayPredicate<T>) => boolean): T | null;
  /** */
  findIndex (predicate: (...args: ArrayPredicate<T>) => boolean): number;
  /** */
  forEach (predicate: (...args: ArrayPredicate<T>) => void): $ArrayAPI<T>;
  /** */
  reduce<R> (reduction: (aggregation: R, ...args: ArrayPredicate<T>) => R, aggregation: R): R;
  /** */
  every (predicate: (...args: ArrayPredicate<T>) => boolean): boolean;
  /** */
  some (predicate: (...args: ArrayPredicate<T>) => boolean): boolean;
  /** */
  push (...items: T[]): $ArrayAPI<T>;
  /** */
  pop (): $ArrayAPI<T>;
  /** */
  includes (searchElement: T, fromIndex?: number): boolean;
  /** */
  shift (): $ArrayAPI<T>;
  /** */
  unshift (...items: T[]): $ArrayAPI<T>;
  /** */
  slice (start?: number, end?: number): $ArrayAPI<T>;
  /** */
  splice (start: number, deleteCount?: number): $ArrayAPI<T>;
  /** */
  reverse (): $ArrayAPI<T>;
  /** */
  join (separator?: string): $StrAPI<string>;
}

/** */
export interface $CommonArrayAPI<T> extends $ArrayPrototypeAPI<T> {
  /** */
  readonly first: T | null;
  /** */
  readonly last: T | null;
  /** */
  readonly value: T[];
  /** */
  getUniqueValues (): $ArrayAPI<T>;
  /** */
  scrutinize (predicate: (item: T, index: number) => boolean): $ArrayAPI<T>;
  /** */
  chunk (chunkSize: number): T[][];
  /** */
  toSet (): Set<T>;
}

/** */
export interface $StringArrayAPI<T extends string> extends $CommonArrayAPI<T> {
  /** Sorts the `Array` alphabetically */
  sort (direction?: 'descending'): $StringArrayAPI<T>;
}

/** */
export interface $NumberArrayAPI<T extends number> extends $CommonArrayAPI<T> {
  /** Sorts the `Array` numerically */
  sort (direction?: 'descending'): $NumberArrayAPI<T>;
}

export interface $ObjArrayAPI<T extends Arr | Obj> extends $CommonArrayAPI<T> {
  /** */
  toMap<K> (keyHandler: ((item: T) => K), override?: 'override'): $MapAPI<K, T>;
  /** */
  toMapWithValues<K, TT> (
    itemHandler: (item: T) => [K, TT],
    override?: 'override'
  ): $MapAPI<K, TT>;
  /** */
  mapValue<K extends keyof T> (value: K): $ArrayAPI<T[K]>;
}

export interface $MatrixAPI<T extends Arr> extends $ObjArrayAPI<T> {

}

/** */
export interface $ObjectArrayAPI<T extends Obj> extends $ObjArrayAPI<T> {
  /** Returns an array sorted by a given string value */
  sortAlphabetically (key: KeysMatching<T, string>, direction?: 'descending'): $ObjectArrayAPI<T>;
  /** Returns an array sorted by a given number value */
  sortNumerically (key: KeysMatching<T, number>, direction?: 'descending'): $ObjectArrayAPI<T>;
  /** */
  doubleLoop<K extends KeysOfArrays<T>> (
    key: K,
    callback: (item: CastedArray<K, T>, parent: T, index: number, array: T[K]) => void
  ): $ObjectArrayAPI<T>;
  /** */
  tripleLoop<K extends KeysOfArrays<T>, KK extends KeysOfArrays<CastedArray<K, T>>> (
    keys: [K, KK],
    callback: (item: DoubleCastedArray<K, T, KK>, parent: CastedArray<K, T>, grandParent: T, index: number, array: DoubleCastedArray<K, T, KK>[]) => void,
  ): $ObjectArrayAPI<T>;
}

/** */
export type $ArrayAPI<T> =
  & $CommonArrayAPI<T>
  & (T extends string ? $StringArrayAPI<T>
    : T extends number ? $NumberArrayAPI<T>
    : T extends boolean ? EmptyObj
    : T extends Arr ? $MatrixAPI<T>
    : (T extends Obj ? $ObjectArrayAPI<T> : EmptyObj));



