import { isNumber } from './numberCasters';
import { isObject } from './objectCasters';
import { isString } from './stringCasters';

import type { Obj } from './Object.types';
import type { Arr } from './Array.types';
import type { ExtendedTypes } from './_shared.types';

/** */
export function isArray (arr: unknown): arr is Arr {
  return typeof arr === 'object' && Array.isArray(arr);
}

/** */
export function isArrayOfNumbers (arr: unknown): arr is number[] {
  return isArray(arr) && arr.every(isNumber);
}

/** */
export function isArrayOfStrings (arr: unknown): arr is string[] {
  return isArray(arr) && arr.every(isString);
}

/** */
export function isArrayOfObjects (arr: unknown): arr is Obj[] {
  return isArray(arr) && arr.every(isObject);
}

/** */
export function isArrayOfBooleans (arr: unknown): arr is boolean[] {
  return isArray(arr) && arr.every((i => typeof i === 'boolean'));
}

/** */
export function isMatrix (arr: unknown): arr is Arr[] {
  return isArray(arr) && arr.every(isArray);
}

export function inferTypeOfArray (arr: Arr): ExtendedTypes[] {
  const typesMap: Partial<{ [T in ExtendedTypes]: number }> = {};

  arr.forEach((item) => {
    let type: ExtendedTypes = typeof item;

    if (type === 'object' && Array.isArray(item)) type = 'array';

    if (typesMap[type])
      // @ts-ignore
      typesMap[type] += 1;
    else
      typesMap[type] = 1;
  });

  return Object.keys(typesMap) as ExtendedTypes[];
}
