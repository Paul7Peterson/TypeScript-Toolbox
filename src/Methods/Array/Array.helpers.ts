import type { KeysMatching, KeysOfArrays, Obj } from '../../TypeUtils';
import { arrayToSet, setToArray } from '../Set';
import { $Array } from './Array';

import type {
  $ArrayAPI,
  CastedArray,
  DoubleCastedArray,
} from './Array.types';

/** Returns an array with unique values from different arrays */
export function getArrayOfUniqueValues<T> (...values: T[][]): $ArrayAPI<T> {
  const flatValues: T[] = values.flatMap(x => x);
  return $Array(flatValues).getUniqueValues();
}

/** */
export function getUniqueValues<T> (values: T[]): T[] {
  return setToArray(arrayToSet(values));
}

/** */
export function sortObjectsAlphabetically<T extends Obj> (
  array: T[],
  key: KeysMatching<T, string>,
  direction?: 'descending',
): T[] {
  return array.sort((a, b) => {
    const aValue = a[key] as unknown as string;
    const bValue = b[key] as unknown as string;

    return direction ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
  });
}

/** */
export function sortObjectsNumerically<T extends Obj> (
  array: T[],
  key: KeysMatching<T, number>,
  direction?: 'descending',
): T[] {
  return array.sort((a, b) => {
    const aValue = a[key] as unknown as number;
    const bValue = b[key] as unknown as number;

    return direction ? bValue - aValue : aValue - bValue;
  });
}

/** */
export function sortAlphabetically (array: string[], direction?: 'descending'): void {
  direction
    ? array.sort((a, b) => b.localeCompare(a))
    : array.sort((a, b) => a.localeCompare(b));
}

/** */
export function sortNumerically (array: number[], direction?: 'descending'): void {
  direction
    ? array.sort((a, b) => b - a)
    : array.sort((a, b) => a - b);
}

/** */
export function mapValue <T extends Obj, K extends keyof T>(array: T[], key: K): T[K][] {
  return array.map((item) => item[key]);
}

export function scrutinize<T> (array: T[], predicate: (item: T, index: number) => boolean): T[] {
  const result: T[] = [];

  array.forEach((item, i) => {
    if (predicate(item, i)) result.push(item);
  });

  return result;
}

/** */
export function doubleLoop<T extends Obj, K extends KeysOfArrays<T>> (
  arr: T[],
  key: K,
  callback: (item: CastedArray<K, T>, parent: T, index: number, array: T[K]) => void,
): void {
  if (!arr.length) return;

  arr.forEach((item) => {
    (item[key] as unknown as CastedArray<K, T>[])
      .forEach((asset, i, arr) => callback(asset, item, i, arr as unknown as T[K]));
  });
}

/** */
export function tripleLoop<T extends Obj, K extends KeysOfArrays<T>, KK extends KeysOfArrays<CastedArray<K, T>>> (
  arr: T[],
  [key1, key2]: [K, KK],
  callback: (item: DoubleCastedArray<K, T, KK>, parent: CastedArray<K, T>, grandParent: T, index: number, array: DoubleCastedArray<K, T, KK>[]) => void,
): void {
  if (!arr.length) return;

  doubleLoop(arr, key1, (child, item) => {
    (child[key2] as unknown as DoubleCastedArray<K, T, KK>[])
      .forEach((subChild, ii, array) => callback(subChild, child, item, ii, array));
  });
}
