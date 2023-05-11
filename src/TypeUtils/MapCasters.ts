import { isNumber } from './numberCasters';
import { isObject } from './objectCasters';
import { isString } from './stringCasters';

import type { MapOfAny } from './Map.types';
import type { Obj } from './Object.types';

/** Checks if a  variable is a `Map`. */
export function isMap (map: unknown): map is MapOfAny {
  return map instanceof Map;
}

/** Checks if a  variable is a `Map` with `object` as keys. */
export function isObjectKeyMap (map: unknown): map is Map<Obj, unknown> {
  return isMap(map) && Array.from(map.keys()).every(isObject);
}

/** Checks if a  variable is a `Map` with `string` as keys. */
export function isStringKeyMap (map: unknown): map is Map<string, unknown> {
  return isMap(map) && Array.from(map.keys()).every(isString);
}

/** Checks if a  variable is a `Map` with `number` as keys. */
export function isNumberKeyMap (map: unknown): map is Map<number, unknown> {
  return isMap(map) && Array.from(map.keys()).every(isNumber);
}

/** Checks if a  variable is a `Map` with `string` or `number` as keys. */
export function isStringOrNumberKeyMap (map: unknown): map is Map<string | number, unknown> {
  return isMap(map) && Array.from(map.keys()).every((k) => isString(k) || isNumber(k));
}

