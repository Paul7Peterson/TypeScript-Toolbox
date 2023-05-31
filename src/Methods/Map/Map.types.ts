import type { Obj } from '../../TypeUtils';
import type { $ObjectAPI, $RecordAPI } from '../Object';
import type { $SetAPI } from '../Set';

export interface $CommonMapPrototype<K, T> {
  /** */
  readonly size: number;
  /** */
  clear (): $MapAPI<K, T>;
  /** */
  delete (key: K): $MapAPI<K, T>;
  /** */
  get (key: K): T | null;
  /** */
  has (key: K): boolean;
  /** */
  set (key: K, item: T): $MapAPI<K, T>;
}

export interface IfHasKeyAPI<K, T> {
  /** The action executed in case of the Map having a value for the given key */
  thenDo (toDo: (value: T) => unknown): $MapAPI<K, T> & {
    /** The action that will be performed if the given key is not found */
    elseDo (pred: () => unknown): $MapAPI<K, T>;
    /** */
    orSet (value: T): $MapAPI<K, T>;
  };
}

export interface $CommonMapAPI<K, T> extends $CommonMapPrototype<K, T>, $RecordAPI<K, T> {
  /** */
  readonly value: Map<K, T>;
  /** */
  ifHasKey (key: K): IfHasKeyAPI<K, T>;
  /** */
  ifHasNoKey (key: K): {
    /** The value that will be set if the given key is not found */
    thenSetWith (value: T): $MapAPI<K, T>,
  };
  /** */
  getOrSet (key: K, setValue: () => T): T;
  /** */
  getOrSetAsync (key: K, setValue: () => Promise<T>): Promise<T>;
  /** */
  toSet (): $SetAPI<T>;
  /** */
  merge<K2, T2> (
    map2: Map<K2, T2>,
    override?: 'override',
  ): $MapAPI<K2 | K, T2 | T>;

  /** */
  setInMapIfNotExists (key: K, value: T): $MapAPI<K, T>;

  /** Merges two `Maps` of `Arrays`. The keys and also their values will be merged. */
  returnAMergeWith (
    map2: Map<K, T>,
    override?: 'override',
  ): $MapAPI<K, T>;

  /** Puts the elements of an `Array` by a processed key in a given `Map`.
   * If the "`override`" flag is active, it won't throw an error in case of an existing value
   * for the given key. */
  setValuesFromArray (
    array: T[],
    keyHandler: (item: T) => K,
    override?: 'override',
  ): $MapAPI<K, T>;

  /** */
  setItemsFromArray<A> (
    array: A[],
    itemHandler: (item: A) => [K, T],
    override?: 'override',
  ): $MapAPI<K, T>;
}

export interface $StringOrNumberMapMethods<K extends string | number, T> {
  /** */
  toObject (): $ObjectAPI<K, T>;
}

export type $MapAPI<K, T> =
  & $CommonMapAPI<K, T>
  & (K extends string | number ? $StringOrNumberMapMethods<K, T> : Obj);

