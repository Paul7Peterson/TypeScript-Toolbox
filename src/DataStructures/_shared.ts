import type {
  IArrayWrapper,
  IIteratorPattern,
  IArrayWrapperOptions,
} from './_shared.types';

export const DEFAULT_CAPACITY = 100;
export const DEFAULT_POINTER = 100;

/** */
// TODO: Implement unit tests
export abstract class ArrayWrapper<T> implements IArrayWrapper<T> {
  capacity: number;
  protected readonly _storage: T[] = [];

  constructor ({ capacity, data, defaultCapacity }: IArrayWrapperOptions<T>) {
    this.capacity = capacity || defaultCapacity;

    if (this.capacity < 0) throw new Error('The capacity must be a positive number.');
    if (this.capacity % 1) throw new Error('The capacity must be an integer.');

    data?.forEach((data, i) => this._storage[i] = data);
  }

  get length (): number { return this._storage.length; }

  get last (): T | null { return this._storage.at(-1) || null; }
}

/** */
// TODO: Implement unit tests
export abstract class IteratorPattern<T> extends ArrayWrapper<T> implements IIteratorPattern<T> {
  protected _pointer = DEFAULT_POINTER;

  get current (): T { return this._storage[this._pointer]; }

  get valid (): boolean { return !!this.current; }

  get key (): number { return this._pointer; }

  rewind (): void {
    this._pointer = 0;
  }

  next (): T | null {
    return this.length ? this.current : null;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  [Symbol.iterator] () {
    return {
      next: (): IteratorResult<T, null> => {
        if (!this.length) return { done: true, value: null };
        const value = this.next();
        if (!value) throw new Error('If there are elements, it should return at least one.');
        return { done: false, value };
      },
    };
  }
}
