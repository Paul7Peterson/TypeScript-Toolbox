type StrOrNumber = string | number;

/** */
export function objectKeys<K extends StrOrNumber> (obj: Record<K, unknown>): K[] {
  return Object.keys(obj) as K[];
}

/** */
export function objectValues<V> (obj: Record<StrOrNumber, V>): V[] {
  return Object.values(obj) as V[];
}

/** */
export function objectEntries<K extends StrOrNumber, V> (obj: Record<K, V>): [K, V][] {
  return Object.entries(obj) as [K, V][];
}

/** */
export function objectToMap<K extends StrOrNumber, T> (obj: Record<K, T>): Map<K, T>{
  return new Map<K, T>(objectEntries(obj));
}
