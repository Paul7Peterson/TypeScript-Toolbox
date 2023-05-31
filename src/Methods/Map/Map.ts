import type {
  $CommonMapAPI,
  $MapAPI,
  $StringOrNumberMapMethods,
  IfHasKeyAPI,
} from './Map.types';
import { isStringOrNumberKeyMap } from '../../TypeUtils';
import { $Array, $ArrayAPI } from '../Array';
import { $Object, $ObjectAPI } from '../Object';
import { $Set, $SetAPI } from '../Set';
import {
  mapEntriesToArray,
  mapKeysToArray,
  mapToObject,
  mapValuesToArray,
  mergeMaps,
  putArrayInMap,
  putArrayItemsInMap,
  returnAMergeWith,
  setInMapIfNotExists,
} from './Map.helpers';

class CommonMapAPI<K, T> implements $CommonMapAPI<K, T> {

  constructor (readonly value: Map<K, T>) { }

  get size (): number { return this.value.size; }

  toValues (): $ArrayAPI<T> {
    return $Array(mapValuesToArray(this.value));
  }
  toEntries (): $ArrayAPI<[K, T]> {
    return $Array(mapEntriesToArray(this.value));
  }
  toKeys (): $ArrayAPI<K> {
    return $Array(mapKeysToArray(this.value));
  }

  ifHasKey (key: K): IfHasKeyAPI<K, T> {
    const prevValue = this.value.get(key);
    const self = this as CommonMapAPI<K, T>;

    return {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      thenDo (toDo: (value: T) => unknown) {
        if (prevValue) toDo(prevValue);

        return {
          ...(self as any),
          elseDo (ifNot: () => unknown): $MapAPI<K, T> {
            if (!prevValue) ifNot();
            return self as any;
          },
          orSet (value: T): $MapAPI<K, T> {
            if (!prevValue) self.value.set(key, value);
            return self as any;
          },
        };
      },
    };
  }
  ifHasNoKey (key: K): { thenSetWith (value: T): $MapAPI<K, T>; } {
    return {
      thenSetWith: (value: T): $MapAPI<K, T> => {
        if (!this.value.has(key)) this.value.set(key, value);
        return $Map(this.value);
      },
    };
  }
  getOrSet (key: K, setValue: () => T): T {
    const value = this.value.get(key);
    return value || this.value.set(key, setValue()).get(key) as T;
  }
  async getOrSetAsync (key: K, setValue: () => Promise<T>): Promise<T> {
    const value = this.value.get(key);
    return value || this.value.set(key, await setValue()).get(key) as T;
  }
  toSet (): $SetAPI<T> {
    return $Set(new Set(mapValuesToArray(this.value)));
  }
  merge<K2, T2> (map2: Map<K2, T2>, override?: 'override'): $MapAPI<K | K2, T | T2> {
    return $Map(mergeMaps(this.value, map2, override));
  }
  setInMapIfNotExists (key: K, value: T): $MapAPI<K, T> {
    const newMap = new Map<K, T>(this.value);
    setInMapIfNotExists(newMap, key, value);
    return $Map(newMap);
  }
  returnAMergeWith (map2: Map<K, T>, override?: 'override'): $MapAPI<K, T> {
    return $Map(returnAMergeWith(this.value, map2, override));
  }
  setValuesFromArray (array: T[], keyHandler: (item: T) => K, override?: 'override'): $MapAPI<K, T> {
    return putArrayInMap(this.value, array, keyHandler, override);
  }
  setItemsFromArray<A> (array: A[], itemHandler: (item: A) => [K, T], override?: 'override'): $MapAPI<K, T> {
    return putArrayItemsInMap(this.value, array, itemHandler, override);
  }
  clear (): $MapAPI<K, T> {
    return $Map();
  }
  delete (key: K): $MapAPI<K, T> {
    const newMap = new Map<K, T>(this.value);
    newMap.delete(key);
    return $Map(newMap);
  }
  get (key: K): T | null {
    return this.value.get(key) || null;
  }
  has (key: K): boolean {
    return this.value.has(key);
  }
  set (key: K, item: T): $MapAPI<K, T> {
    return $Map(new Map<K, T>(this.value).set(key, item));
  }
  valueOf (): Map<K, T> {
    return this.value;
  }
}

class StringOrNumberMapAPI<K extends string | number, T> extends CommonMapAPI<K, T> implements $StringOrNumberMapMethods<K, T> {
  toObject (): $ObjectAPI<K, T> {
    return $Object(mapToObject(this.value));
  }
}

/** */
export function $Map<K, T> (map?: Map<K, T>): $MapAPI<K, T> {
  const mapValue = new Map<K, T>(map);

  if (isStringOrNumberKeyMap(mapValue))
    return new StringOrNumberMapAPI(mapValue) as any;

  return new CommonMapAPI(mapValue) as any;
}
