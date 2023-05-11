
/** [check](https://stackoverflow.com/questions/12897742/how-do-you-specify-that-a-class-property-is-an-integer#answer-50521248) */
export type Opaque<T, K> = T & { __opaque__: K; };

/** A primitive value for JSON */
export type Primitive = string | number | boolean;

/** Types identified by JavaScript */
export type Types =
  | 'string'
  | 'boolean'
  | 'number'
  | 'object'
  | 'function'
  | 'bigint'
  | 'symbol'
  | 'undefined';

export type ExtendedTypes =
  | Types
  | 'array';

/** A nullable value */
export type Nullable<T> = T | null;
