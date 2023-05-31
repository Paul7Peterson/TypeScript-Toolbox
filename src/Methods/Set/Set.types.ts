import type { $ArrayAPI } from '../Array';

export interface $SetPrototypeAPI<T> {
  /** */
  readonly size: number;
  /** */
  forEach (predicate: (value: T, value2: T, set: Set<T>) => void): $SetAPI<T>;
  /** */
  add (value: T): $SetAPI<T>;
  /** */
  delete (value: T): $SetAPI<T>;
  /** */
  clear (): $SetAPI<T>;
}

export interface $SetAPI<T> extends $SetPrototypeAPI<T> {
  /** */
  readonly value: Set<T>;
  /** */
  toArray (): $ArrayAPI<T>;
  /** */
  ifHas (item: T): {
    thenDo: (predicate: (item: T) => unknown) => $SetAPI<T>;
  }
}
