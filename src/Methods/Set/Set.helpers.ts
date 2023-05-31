/** Returns the values of a Set as an array */
export function setToArray <T>(set: Set<T>): T[] {
  return Array.from(set.values());
}

/** Returns a set from an array */
export function arrayToSet<T> (array: T[]): Set<T> {
  return new Set(array);
}
