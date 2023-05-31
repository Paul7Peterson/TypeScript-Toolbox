import { $Array } from '../Array';
import { $Map } from './Map';
import type { $MapAPI } from './Map.types';
import { setToArray } from '../Set';

/** */
export function mapValuesToArray<T> (map: Map<unknown, T>): T[] {
  return Array.from(map.values());
}

/** */
export function mapKeysToArray <T>(map: Map<T, unknown>): T[] {
  return Array.from(map.keys());
}

/** */
export function mapEntriesToArray <K, T>(map: Map<K, T>): [K, T][] {
  return Array.from(map.entries());
}

/** */
export function mapToObject <K extends string | number, T>(map: Map<K, T>): Record<K, T> {
  return mapEntriesToArray(map).reduce((t, [k, v]) => {
    t[k] = v;
    return t;
  }, {} as Record<K, T>);
}

/** */
export function setInMapIfNotExists<K, T> (
  map: Map<K, T>,
  key: K,
  value: T,
): void {
  $Map(map).ifHasKey(key)
    .thenDo((mapValue) => { throw new Error(`The map has already the value "${mapValue}" for the key "${key}"`); })
    .elseDo(() => map.set(key, value));
}

/** */
export function returnAMergeWith<K, T> (
  map: Map<K, T>,
  map2: Map<K, T>,
  override?: 'override',
): Map<K, T> {
  const merged = new Map<K, T>(mapEntriesToArray(map));
  const entries = mapEntriesToArray(map2);

  if (override)
    entries.forEach(([key, value]) => merged.set(key, value));
  else
    entries.forEach(([key, value]) => setInMapIfNotExists(merged, key, value));

  return merged;
}

/** */
export function putArrayInMap<T, K> (
  map: Map<K, T>,
  array: T[],
  keyHandler: (item: T) => K,
  override?: 'override',
): $MapAPI<K, T> {
  let newMap = $Map(map);
  if (override)
    array.forEach((value) => {newMap = newMap.set(keyHandler(value), value);});
  else
    array.forEach((value) => {newMap = newMap.setInMapIfNotExists(keyHandler(value), value);});
  return newMap;
}

/** */
export function putArrayItemsInMap<T, K, A> (
  map: Map<K, T>,
  array: A[],
  itemHandler: (item: A) => [K, T],
  override?: 'override',
): $MapAPI<K, T> {
  let newMap = $Map(map);
  if (override)
    array.forEach((item) => {newMap = newMap.set(...itemHandler(item));});
  else
    array.forEach((item) => { newMap = newMap.setInMapIfNotExists(...itemHandler(item)); });
  return newMap;
}

export function mergeMaps<K1, K2, T1, T2> (
  a: Map<K1, T1>,
  b: Map<K2, T2>,
  override?: 'override',
): Map<K1 | K2, T1 | T2> {
  const merged = new Map<K1 | K2, T1 | T2>(mapEntriesToArray(a));

  if (override)
    b.forEach((value, key) => merged.set(key, value));
  else
    b.forEach((value, key) => setInMapIfNotExists(merged, key, value));

  return merged;
}

/** Turns a `Map` of `Sets` into a `Map` of `Arrays` */
export function fromMapOfSetsToMapsOfArrays<K, T> (map: Map<K, Set<T>>): Map<K, T[]> {
  const result = new Map<K, T[]>();
  map.forEach((set, key) => { result.set(key, setToArray(set)); });
  return result;
}

/** Creates a `Map` from an `Array` by a processed key */
export function mapFromArray<T, K> (
  array: T[],
  keyHandler: (item: T) => K,
  override?: 'override',
): Map<K, T> {
  return $Map<K, T>()
    .setValuesFromArray(array, keyHandler, override).value;
}

/** Creates a `Map` from an `Array` by a processed key and value */
export function mapFromArrayWithValues<T, K, TT> (
  array: T[],
  itemHandler: (item: T) => [K, TT],
  override?: 'override',
): Map<K, TT> {
  return $Map<K, TT>()
    .setItemsFromArray(array, itemHandler, override).value;
}

/** Creates a Map of Arrays from an Array */
export function mapOfArraysFromArray<T, K> (
  array: T[],
  keyHandler: (item: T) => K,
): Map<K, T[]> {
  const result = new Map<K, T[]>();

  array.forEach((value) => {
    const key = keyHandler(value);
    $Map(result).ifHasKey(key)
      .thenDo((mapValue) => mapValue.push(value))
      .elseDo(() => result.set(key, [value]));
  });

  return result;
}

/** Merges two `Maps` of `Arrays`. The keys and also their values will be merged. */
export function mergeMapsOfArrays<K1, K2, T1, T2> (
  a: Map<K1, T1[]>,
  b: Map<K2, T2[]>,
): Map<K1 | K2, (T1 | T2)[]> {
  const merged = new Map<K1 | K2, (T1 | T2)[]>();

  a.forEach((value, key) =>
    merged.set(key, $Array(value).getUniqueValues().value));

  b.forEach((value, key) => {
    $Map(merged).ifHasKey(key)
      .thenDo((mapValues) => merged.set(key, $Array([...mapValues, ...value]).getUniqueValues().value))
      .elseDo(() => merged.set(key, $Array(value).getUniqueValues().value));
  });

  return merged;
}
