/** General map. */
export type MapOfAny = Map<unknown, unknown>;

/** Infers the type of the keys of a given `Map` */
export type MapKeys<M extends MapOfAny> =
  M extends Map<infer T, unknown> ? T : never;

/** Infers the type of the values of a given `Map` */
export type MapValues<M extends MapOfAny> =
  M extends Map<unknown, infer T> ? T : never;

/** Infers the type of the entries of a given `Map` as a tuple */
export type MapEntries<M extends MapOfAny> =
  M extends Map<infer K, infer T> ? [key: K, value: T] : never;

/** Archive */
export type Archive<T extends { uuid: string; }> = Map<T['uuid'], T>;
