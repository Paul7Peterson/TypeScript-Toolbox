import type { Str } from '@rimbu/typical';
// import type { GetLength } from './Array.types';
// import type { Next } from './Number.types';

// type SeparateCapital<T extends string, C extends string & Str.NonEmptyString<C>> =
//   Str.ReplaceAll<T, C, `-${Lowercase<C>}`>;

/** */
export type Capitals = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', '0', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

/** */
export type GetCapital<N extends number> = Capitals[N];

// type RecursiveReplaceCapital<T extends string, N extends number> =
//   GetLength<Capitals> extends N
//   ? T
//   : GetCapital<N> extends infer CC extends string ? CC extends Str.NonEmptyString<CC>
//   ? RecursiveReplaceCapital<SeparateCapital<T, CC>, Next<N>>
//   : never
//   : never;

/** */
// export type SeparateByCapitals<T extends string> =
//   RecursiveReplaceCapital<T, 0>

type ReplaceWithUnderscore<T extends string> =
  Str.ReplaceAll<Str.ReplaceAll<T, ' ', '_'>, '-', '_'>;

type ReplaceWithDash<T extends string> =
  Str.ReplaceAll<Str.ReplaceAll<T, ' ', '-'>, '_', '-'>;

type CamelCaseHelper<T extends string> =
  T extends `_${infer Suffix}`
  ? CamelCase<Suffix>
  : T extends `${infer Prefix}_`
  ? CamelCase<Prefix>
  : T extends `${infer Prefix}_${infer Suffix}`
  ? CamelCase<`${Prefix}${Capitalize<Suffix>}`>
  : T;

// type SnakeToCamelCase<S extends string> =
//   S extends `${infer T}_${infer U}` ?
//   `${T}${Capitalize<SnakeToCamelCase<U>>}` :
//   S

/** */
export type KebabCase<T extends string> =
  Lowercase<ReplaceWithDash<T>> & string;

/** */
export type CamelCase<T extends string> =
  CamelCaseHelper<ReplaceWithUnderscore<T>> & string;

/** */
export type PascalCase<T extends string> =
  Capitalize<CamelCase<T>> & string;

/** */
export type SnakeCase<_T extends string> = string;
// Str.ReplaceAll<ReplaceWithUnderscore<SeparateByCapitals<T>>,  '__', '_'> & string;

/** */
export type BoaCase<T extends string> = Uppercase<SnakeCase<T>> & string;
