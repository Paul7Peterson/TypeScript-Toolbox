import { isBoolean } from './booleanCasters';
import { isNumber } from './numberCasters';
import { isString } from './stringCasters';

import type { Dict, Obj } from './Object.types';

/** */
export function isObject (obj: unknown): obj is Obj {
  return typeof obj === 'object' && !Array.isArray(obj);
}

/** */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isEmptyObject (obj: unknown): obj is {} {
  return isObject(obj) && !Object.entries(obj).length;
}

/** */
export function isDictOfStrings (obj: unknown): obj is Dict<string> {
  return isObject(obj) && Object.values(obj).every(isString);
}

/** */
export function isDictOfNumbers (obj: unknown): obj is Dict<number> {
  return isObject(obj) && Object.values(obj).every(isNumber);
}

/** */
export function isDictOfBooleans (obj: unknown): obj is Dict<boolean> {
  return isObject(obj) && Object.values(obj).every(isBoolean);
}

/** */
export function isDictOfObjects (obj: unknown): obj is Dict<Obj> {
  return isObject(obj) && Object.values(obj).every(isObject);
}
