import { $Array } from '../Array';
import { $Map } from '../Map';
import { objectEntries, objectKeys, objectToMap, objectValues } from './Object.helpers';
import { $ObjectAPI } from './Object.types';

/** */
export function $Object<K extends string | number, T> (obj: Record<K, T>): $ObjectAPI<K, T> {
  return {
    toKeys: () => $Array(objectKeys(obj)),

    toValues: () => $Array(objectValues(obj)),

    toEntries: () => $Array(objectEntries(obj)),

    toMap: () => $Map(objectToMap(obj)),
  };
}

