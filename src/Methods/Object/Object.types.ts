import type { $ArrayAPI } from '../Array';
import type { $MapAPI } from '../Map';

/** */
export interface $RecordAPI<K, T> {
  /** Returns the keys as an `Array` */
  toKeys (): $ArrayAPI<K>;
  /** Returns the values as an `Array` */
  toValues (): $ArrayAPI<T>;
  /** Returns the entries as an `Array` */
  toEntries (): $ArrayAPI<[K, T]>;
}

/** */
export type $ObjectAPI<K extends string | number, T> =
& $RecordAPI<K, T>
& {
  /** Returns the entries as an `Object` */
  toMap (): $MapAPI<K, T>;
};
