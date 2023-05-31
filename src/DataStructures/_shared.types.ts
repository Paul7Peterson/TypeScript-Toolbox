
export interface IArrayWrapper<T> {
  /** */
  readonly length: number;
  /** */
  readonly capacity: number;
  /** */
  readonly last: Readonly<T> | null;
}

/** */
export interface IArrayWrapperOptions<T> {
  /** */
  data?: T[];
  /** */
  capacity?: number;
  /** */
  defaultCapacity: number;
}

/**
 * Iterator Design Pattern
 *
 * Intent: Lets you traverse elements of a collection without exposing its
 * underlying representation (list, stack, tree, etc.).
 */
export interface IIteratorPattern<T> extends Iterable<T | null> {
  /** Return the current element. */
  readonly current: T;
  /** Checks if current position is valid. */
  readonly valid: boolean;
  /** Return the key of the current element. */
  readonly key: number;
  /** Rewind the Iterator to the first element. */
  rewind(): void;
  /** Return the current element and move forward to next element. */
  next(): T | null;
  /** */
  [Symbol.iterator] (): {
    /** Return the current element and move forward to next element. */
    next(): IteratorResult<T, null>;
  }
}