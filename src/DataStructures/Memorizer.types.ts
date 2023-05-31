import type { Awaitable, Dict, MapEntries, MapKeys, MapValues } from '../TypeUtils';

/** */
export interface IMemo<T extends Dict<Map<any, any>>> {
  /** */
  readonly searches: (keyof T)[];
  /** */
  getValue<S extends keyof T, K extends MapKeys<T[S]>> (
    search: S,
    key: K,
  ): MapValues<T[S]> | null;
  /** */
  getKeys<S extends keyof T> (
    search: S,
  ): MapKeys<T[S]>[];
  /** */
  getValues<S extends keyof T> (
    search: S,
  ): MapValues<T[S]>[];
  /** */
  setValue<S extends keyof T, K extends MapKeys<T[S]>, V extends MapValues<T[S]>> (
    search: S,
    key: K,
    value: V,
  ): V;
  /** */
  deleteValue<S extends keyof T, K extends MapKeys<T[S]>> (
    search: S,
    key: K,
  ): void;
  /** */
  getOrSet<S extends keyof T, K extends MapKeys<T[S]>> (
    search: S,
    key: K,
    provider: () => Awaitable<MapValues<T[S]> | null>,
  ): Promise<MapValues<T[S]>>;
  /** */
  getOrSetSync<S extends keyof T, K extends MapKeys<T[S]>> (
    search: S,
    key: K,
    provider: () => MapValues<T[S]> | null,
  ): MapValues<T[S]>;
  /** */
  hasKeys<S extends keyof T> (search: S): boolean;
  /** */
  hasValues<S extends keyof T> (search: S): boolean;
  /** */
  fill<S extends keyof T> (search: S): MemoFillReturn<T, S>;
}

/** */
export interface MemoFillReturn<T extends Dict<Map<unknown, unknown>>, S extends keyof T> {
  /** */
  withValues (provider: () => Awaitable<MapValues<T[S]>[]>): {
    /** */
    usingKey (keySelector: (item: MapValues<T[S]>) => MapKeys<T[S]>): Promise<void>;
  },
  /** */
  withEntries (provider: () => Awaitable<MapEntries<T[S]>[]>): Promise<void>;
}
