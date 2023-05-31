import type { Observable } from 'rxjs';
import type { Obj, Awaitable, ValuesOf } from '../../TypeUtils';

/** */
export async function mapPromises<T, R> (
  promises: Promise<T>[],
  callback: (item: T, index: number) => R,
): Promise<R[]> {
  return Promise.all(promises)
    .then((items) => items.map(callback));
}

/** */
export async function mapPromisedItems<T, R> (
  promises: Promise<T[]>,
  callback: (item: T, index: number) => Awaitable<R>,
): Promise<R[]> {
  return promises.then((items) => Promise.all(items.map(callback)));
}

/** */
export async function reducePromises<T, A extends Obj> (
  promises: Promise<T>[],
  aggregation: A,
  callback: (item: T) => [keyof A, ValuesOf<A>],
): Promise<A> {
  return Promise.all(promises)
    .then((items) => items.reduce((t, item) => {
      const [k, v] = callback(item);
      t[k] = v;
      return t;
    }, aggregation));
}

/** */
export async function reducePromisedItems<T, A extends Obj> (
  promises: Promise<T[]>,
  aggregation: A,
  callback: (item: T) => [keyof A, ValuesOf<A>],
): Promise<A> {
  return promises
    .then((items) => items.reduce((t, item) => {
      const [k, v] = callback(item);
      t[k] = v;
      return t;
    }, aggregation));
}

/** */
export async function mergePromises<T> (
  promises: Promise<T[]>[],
): Promise<T[]> {
  return Promise.all(promises)
    .then((items) => items.reduce((t, a) => [...t, ...a], [] as T[]));
}

/** */
export async function countPromises (promises: Promise<number>[]): Promise<number> {
  return Promise.all(promises)
    .then((items) => items.reduce((t, item) => t + item, 0));
}

/** */
export async function awaitResolved<T> (promises: Promise<T>[]): Promise<T[]> {
  return Promise.allSettled(promises)
    .then((responses) => {
      const result: T[] = [];
      responses.forEach((res) => {
        if (res.status === 'fulfilled') result.push(res.value);
      });
      return result;
    });
}

/** */
export async function awaitRejected<T = Obj> (promises: Promise<Obj>[]): Promise<T[]> {
  return Promise.allSettled(promises)
    .then((responses) => {
      const result: T[] = [];
      responses.forEach((res) => {
        if (res.status === 'rejected') result.push(res.reason);
      });
      return result;
    });
}

/** */
export async function awaitClassified<T, R = Obj> (promises: Promise<T>[]): Promise<{ resolved: T[]; rejected: R[]; }> {
  return Promise.allSettled(promises)
    .then((responses) => {
      const resolved: T[] = [];
      const rejected: R[] = [];

      responses.forEach((res) => {
        if (res.status === 'fulfilled') resolved.push(res.value);
        else rejected.push(res.reason);
      });

      return { resolved, rejected };
    });
}


/** */
export function observableToPromise<T, U> (observable: Observable<T>): Observable<T>;
export function observableToPromise<T, U> (observable: Observable<T>, callback: (arg: T) => U): Promise<U>;
export function observableToPromise<T, U> (observable: Observable<T>, callback?: (arg: T) => U): Observable<T> | Promise<U> {
  if (!callback) return observable;
  return new Promise<U>((resolve, reject) => {
    observable.subscribe({
      next: (value) => resolve(callback(value)),
      error: (error) => reject(error),
    });
  });
}

/** */
export function observableToVoidPromise<T> (observable: Observable<T>): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    observable.subscribe({
      next: () => resolve(),
      error: (error) => reject(error),
    });
  });
}

