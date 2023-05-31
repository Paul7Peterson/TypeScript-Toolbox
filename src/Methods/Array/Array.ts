import { Arr, inferTypeOfArray, KeysMatching, KeysOfArrays, Obj } from '../../TypeUtils';
import { $Map, $MapAPI, mapFromArray, mapFromArrayWithValues } from '../Map';
import { $Str, $StrAPI } from '../Str';
import {
  doubleLoop,
  getUniqueValues,
  mapValue,
  scrutinize,
  sortAlphabetically,
  sortNumerically,
  sortObjectsAlphabetically,
  sortObjectsNumerically,
  tripleLoop,
} from './Array.helpers';

import type {
  $ArrayAPI,
  $CommonArrayAPI,
  $MatrixAPI,
  $NumberArrayAPI,
  $ObjArrayAPI,
  $ObjectArrayAPI,
  $StringArrayAPI,
  CastedArray,
} from './Array.types';
class CommonArrayAPI<T> implements $CommonArrayAPI<T> {

  constructor (readonly value: T[]) { }

  get length (): number { return this.value.length; }

  get first (): T | null { return this.value[0] || null; }

  get last (): T | null { return this.value.at(-1) || null; }

  at (position: number): T | null {
    return this.value.at(position) || null;
  }
  map<R> (mapper: (item: T, index: number, self: T[]) => R): $ArrayAPI<R> {
    return $Array(this.value.map(mapper));
  }
  filter (filter: (item: T, index: number, self: T[]) => boolean): $ArrayAPI<T> {
    return $Array(this.value.filter(filter));
  }
  find (predicate: (item: T, index: number, self: T[]) => boolean): T | null {
    return this.value.find(predicate) || null;
  }
  findIndex (predicate: (item: T, index: number, self: T[]) => boolean): number {
    return this.value.findIndex(predicate);
  }
  forEach (predicate: (item: T, index: number, self: T[]) => void): $ArrayAPI<T> {
    this.value.forEach(predicate);
    return $Array(this.value);
  }
  reduce<R> (reduction: (aggregation: R, item: T, index: number, self: T[]) => R, aggregation: R): R {
    return this.value.reduce(reduction, aggregation);
  }
  every (predicate: (item: T, index: number, self: T[]) => boolean): boolean {
    return this.value.every(predicate);
  }
  some (predicate: (item: T, index: number, self: T[]) => boolean): boolean {
    return this.value.some(predicate);
  }
  push (...items: T[]): $ArrayAPI<T> {
    return $Array([...this.value, ...items]);
  }
  pop (): $ArrayAPI<T> {
    const newArray = [...this.value];
    newArray.pop();
    return $Array(newArray);
  }
  includes (searchElement: T, fromIndex?: number): boolean {
    return this.value.includes(searchElement, fromIndex);
  }
  shift (): $ArrayAPI<T> {
    const newArray = [...this.value];
    newArray.shift();
    return $Array(newArray);
  }
  unshift (...items: T[]): $ArrayAPI<T> {
    return $Array([...items, ...this.value]);
  }
  slice (start?: number, end?: number): $ArrayAPI<T> {
    return $Array(this.value.slice(start, end));
  }
  splice (start: number, deleteCount?: number): $ArrayAPI<T> {
    return $Array(this.value.splice(start, deleteCount));
  }
  reverse (): $ArrayAPI<T> {
    return $Array([...this.value].reverse());
  }
  join (separator?: string): $StrAPI<string> {
    return $Str(this.value.join(separator));
  }
  getUniqueValues (): $ArrayAPI<T> {
    return $Array(getUniqueValues(this.value));
  }
  scrutinize (predicate: (item: T, index: number) => boolean): $ArrayAPI<T> {
    return $Array(scrutinize(this.value, predicate));
  }
  toSet (): Set<T> {
    return new Set(this.value);
  }
  chunk (chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < this.value.length; i += chunkSize) {
      chunks.push(this.value.slice(i, i + chunkSize));
    }
    return chunks;
  }
  valueOf (): T[] {
    return this.value;
  }
}

export class $StringArray<T extends string> extends CommonArrayAPI<T> implements $StringArrayAPI<T> {
  sort (direction?: 'descending'): $StringArrayAPI<T> {
    sortAlphabetically(this.value, direction);
    return new $StringArray(this.value);
  }
}

export class $NumberArray<T extends number> extends CommonArrayAPI<T> implements $NumberArrayAPI<T> {
  sort (direction?: 'descending'): $NumberArrayAPI<T> {
    sortNumerically(this.value, direction);
    return new $NumberArray(this.value);
  }
}

export class ObjArrayAPI<T extends Arr | Obj> extends CommonArrayAPI<T> implements $ObjArrayAPI<T> {
  toMap<K> (keyHandler: (item: T) => K, override?: 'override'): $MapAPI<K, T> {
    return $Map(mapFromArray(this.value, keyHandler, override));
  }
  toMapWithValues<K, TT> (itemHandler: (item: T) => [K, TT], override?: 'override'): $MapAPI<K, TT> {
    const map = mapFromArrayWithValues(this.value, itemHandler, override);
    return $Map(map);
  }
  mapValue<K extends keyof T> (value: K): $ArrayAPI<T[K]> {
    return $Array(mapValue(this.value, value));
  }
}

export class $Matrix<T extends Arr> extends ObjArrayAPI<T> implements $MatrixAPI<T> {

}


export class $ObjectArray<T extends Obj> extends ObjArrayAPI<T> implements $ObjectArrayAPI<T> {
  sortAlphabetically (key: KeysMatching<T, string>, direction?: 'descending'): $ObjectArrayAPI<T> {
    sortObjectsAlphabetically(this.value, key, direction);
    return new $ObjectArray(this.value);
  }
  sortNumerically (key: KeysMatching<T, number>, direction?: 'descending'): $ObjectArrayAPI<T> {
    sortObjectsNumerically(this.value, key, direction);
    return new $ObjectArray(this.value);
  }
  doubleLoop<K extends KeysOfArrays<T>> (
    key: K,
    callback: (item: CastedArray<K, T>, parent: T, index: number, array: T[K]) => void,
  ): $ObjectArrayAPI<T> {
    doubleLoop(this.value, key, callback);
    return new $ObjectArray(this.value);
  }
  tripleLoop<K extends KeysOfArrays<T>, KK extends KeysOfArrays<CastedArray<K, T>>> (
    keys: [K, KK],
    callback: (item: CastedArray<KK, CastedArray<K, T>>, parent: CastedArray<K, T>, grandParent: T, index: number, array: CastedArray<KK, CastedArray<K, T>>[]) => void,
  ): $ObjectArrayAPI<T> {
    tripleLoop(this.value, keys, callback);
    return new $ObjectArray(this.value);
  }
}

class EmptyArrayAPI extends CommonArrayAPI<Obj> implements $ObjectArrayAPI<Obj> {
  sort (): $ObjectArrayAPI<Obj> { return this; }
  sortAlphabetically (_key: never, _direction?: 'descending'): $ObjectArrayAPI<Obj> {
    return this;
  }
  sortNumerically (_key: never, _direction?: 'descending'): $ObjectArrayAPI<Obj> {
    return this;
  }
  doubleLoop<K extends never> (
    _key: K,
    _callback: (item: CastedArray<K, Obj>, parent: Obj, index: number, array: Obj[K]) => void,
  ): $ObjectArrayAPI<Obj> {
    return this;
  }
  tripleLoop<K extends never, KK extends KeysOfArrays<CastedArray<K, Obj>>> (
    _keys: [K, KK],
    _callback: (item: CastedArray<KK, CastedArray<K, Obj>>, parent: CastedArray<K, Obj>, grandParent: Obj, index: number, array: CastedArray<KK, CastedArray<K, Obj>>[]) => void,
  ): $ObjectArrayAPI<Obj> {
    return this;
  }
  toMap<K> (_keyHandler: (item: Obj) => K, _override?: 'override'): $MapAPI<K, Obj> {
    return $Map();
  }
  toMapWithValues<K, TT> (_itemHandler: (item: Obj) => [K, TT], _override?: 'override'): $MapAPI<K, TT> {
    return $Map();
  }
  mapValue<K extends never> (_value: K): $ArrayAPI<Obj[K]> {
    return $Array([]) as any;
  }
}

/** */
// export function $Array<T extends number> (array: T[]): $NumberArrayAPI<T>;
// export function $Array<T extends string> (array: T[]): $StringArrayAPI<T>;
// export function $Array<T extends Arr> (array: T[]): $MatrixAPI<T>;
// export function $Array<T extends Obj> (array: T[]): $ObjArrayAPI<T>;
// export function $Array<T extends boolean> (array: T[]): $CommonArrayAPI<T>;
export function $Array<T> (array: T[]): $ArrayAPI<T> {
  if (!array.length)
    return new EmptyArrayAPI(array as Obj[]) as any;

  const types = inferTypeOfArray(array);
  if (types.length !== 1) throw new Error('This API cannot handle mixed types for the array.');

  const arrayType = types[0];

  switch (arrayType) {
    case 'number': return new $NumberArray(array as number[]) as any;
    case 'string': return new $StringArray(array as string[]) as any;
    case 'array': return new $Matrix(array as Arr[]) as any;
    case 'object': return new $ObjectArray(array as Obj[]) as any;
    case 'boolean': return new CommonArrayAPI(array as number[]) as any;
    default: throw new Error('Invalid array type');
  }
}
