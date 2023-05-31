
import { $Array, $ArrayAPI } from '../Array';
import type { $SetAPI } from './Set.types';
import { setToArray } from './Set.helpers';

/** */
export function $Set<T> (set?: Set<T>): $SetAPI<T> {
  const setValue = set || new Set<T>();

  return new SetAPI(setValue);
}


export class SetAPI<T> implements $SetAPI<T> {

  constructor (readonly value: Set<T>) { }

  get size (): number { return this.value.size; }

  forEach (predicate: (value: T, value2: T, set: Set<T>) => void): $SetAPI<T> {
    this.value.forEach(predicate);
    return $Set(this.value);
  }
  add (value: T): $SetAPI<T> {
    this.value.add(value); return $Set(this.value);
  }
  delete (value: T): $SetAPI<T> {
    this.value.delete(value); return $Set(this.value);
  }
  clear (): $SetAPI<T> {
    this.value.clear(); return $Set(this.value);
  }
  toArray (): $ArrayAPI<T> {
    return $Array(setToArray(this.value));
  }
  ifHas (item: T): { thenDo: (predicate: (item: T) => unknown) => $SetAPI<T>; } {
    return {
      thenDo: (pred: (item: T) => unknown): $SetAPI<T> => {
        if (this.value?.has(item)) pred(item);
        return $Set(this.value);
      },
    };
  }
}
