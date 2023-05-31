import { $Object } from '../Methods';
import { Dict } from '../TypeUtils';

import type { MapEntries, MapKeys, MapValues } from '../TypeUtils/Map.types';
import type { Awaitable } from '../TypeUtils/Promise.types';
import type { IMemo, MemoFillReturn } from './Memorizer.types';


export class Memorizer<T extends Dict<Map<any, any>>> implements IMemo<T> {
  constructor (
    private readonly _initializer: T,
  ) { }

  get searches (): (keyof T)[] {
    return Object.keys(this._initializer);
  }

  getValue<S extends keyof T, K extends MapKeys<T[S]>> (
    search: S,
    key: K,
  ): MapValues<T[S]> | null {
    return this._initializer[search].get(key) || null;
  }

  getKeys<S extends keyof T> (search: S): MapKeys<T[S]>[] {
    return Array.from(this._initializer[search].keys());
  }

  getValues<S extends keyof T> (search: S): MapValues<T[S]>[] {
    return Array.from(this._initializer[search].values());
  }

  setValue<S extends keyof T, K extends MapKeys<T[S]>, V extends MapValues<T[S]>> (
    search: S,
    key: K,
    value: V,
  ): V {
    this._initializer[search].set(key, value);
    return value;
  }

  deleteValue<S extends keyof T, K extends MapKeys<T[S]>> (
    search: S,
    key: K,
  ): void {
    if (this._initializer[search].has(key))
      this._initializer[search].delete(key);
  }

  async getOrSet<S extends keyof T, K extends MapKeys<T[S]>> (
    search: S,
    key: K,
    provider: () => Awaitable<MapValues<T[S]> | null>,
  ): Promise<MapValues<T[S]>> {
    const item = this.getValue(search, key);
    if (item) return item;

    const newItem = await provider();
    if (newItem === null) throw new Error('The value obtained as fallback is not available');
    return this.setValue(search, key, newItem);
  }

  getOrSetSync<S extends keyof T, K extends MapKeys<T[S]>> (
    search: S,
    key: K,
    provider: () => MapValues<T[S]>,
  ): MapValues<T[S]> {
    const item = this.getValue(search, key);
    if (item) return item;

    const newItem = provider();
    if (newItem === null) throw new Error('The value obtained as fallback is not available');
    return this.setValue(search, key, newItem);
  }

  hasKeys<S extends keyof T> (search: S): boolean {
    return !!this.getKeys(search).length;
  }

  hasValues<S extends keyof T> (search: S): boolean {
    return this.getValues(search).every((v) => !!v);
  }

  clear<S extends keyof T> (search: S): void {
    this._initializer[search].clear();
  }

  clearAll (): void {
    $Object(this._initializer).toValues().forEach((map) => map.clear());
  }

  fill<S extends keyof T> (search: S): MemoFillReturn<T, S> {
    const map = this._initializer[search];

    return {
      withValues: (provider: () => Awaitable<MapValues<T[S]>[]>) => ({
        async usingKey (keySelector: (item: MapValues<T[S]>) => MapKeys<T[S]>): Promise<void> {
          const items = await provider();
          items.forEach((item) => { map.set(keySelector(item), item); });
        },
      }),
      async withEntries (provider: () => Awaitable<MapEntries<T[S]>[]>): Promise<void> {
        const items = await provider();
        items.forEach(([key, item]) => { map.set(key, item); });
      },
    };
  }
}

