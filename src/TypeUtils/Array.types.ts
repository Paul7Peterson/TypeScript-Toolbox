import type { StrNum, Str } from '@rimbu/typical';

import type { Enumerate } from './Number.types';
import type { Stringify } from './String.types';

/** `Array` of `unknown` elements */
export type Arr = unknown[];

/** Infers the type of the elements of a given `Array` or `Tuple`.
 * 
 * @example
 * ```ts
 * type Tuple = [0, 'hello', () => void];
 * 
 * type _1 = ArrayElement<Tuple>;                ; type _1 = 0 | "hello" | (() => void);
 * type _2 = ArrayElement<(number | string)[]>;  ; type _2 = number | string;
 * type _3 = ArrayElement<string[]>;             ; type _3 = string;
 * ``` 
 */
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/** Infers the length of a given `Array` or `Tuple`.
 * For arrays, the value would be always `number`.
 *
 * @example
 * ```ts
 * type Tuple = [0, 'hello', () => void];
 * 
 * type _1 = GetLength<Tuple>;       ; type _1 = 3;
 * type _2 = GetLength<[]>;          ; type _2 = 0;
 * type _3 = GetLength<string[]>;    ; type _3 = number;
 * ``` 
 */
export type GetLength<T extends Arr> = T extends { length: infer L; } ? L : never;

/** Infers the type of the first element of a given `Array` or `Tuple` */
export type GetFirst<T extends Arr> = T[0];

/** Returns the type of an element in a tuple.
 * Use always tuples and not arrays.
 *
 * @example
 * ```ts
 * type Tuple = [0, 'hello', () => void];
 * 
 * type _1 = GetElement<Tuple, 1>;     ; type _1 = 'hello';
 * type _2 = GetElement<Tuple, 2>;     ; type _2 = (() => void);
 * type _3 = GetElement<Tuple, 3>;     ; type _3 = ❌
 * type _4 = GetElement<string[], 3>;  ; type _4 = ❌
 * ``` 
 */
export type GetElement<T extends Arr, N extends Enumerate<GetLength<T>>> =
  N extends number ? T[N] : never;

type BuildTupleHelper<N extends string, Result extends Arr, T> =
  N extends Str.Append<StrNum.Digit & infer D, infer Rest>
  ? BuildTupleHelper<Rest, [...StrNum.DigitToTup<[T]>[StrNum.Digit & D], ...StrNum.DigitToTup<[]>['10']], T>
  : Result;

/** Defines the type of a tuple of a given type and amount 
 * @example
 * ```ts * 
 * type _1 = TupleOf<number, 2>;     ; type _1 = [number, number];
 * type _2 = TupleOf<['a'], 3>;      ; type _2 = [['a'], ['a'], ['a']];
 * type _3 = TupleOf<'a' | 0, 1>;    ; type _3 = [0 | 'a'];
 * type _4 = TupleOf<string[], 3>;   ; type _4 = [string[], string[], string[]];
 * type _5 = TupleOf<'', 0>;         ; type _5 = [];
 * ``` 
 * */
export type TupleOf<T, N extends number> =
  BuildTupleHelper<Stringify<N>, [], T>;

/** A named tuple for a given defined range of numbers */
export type NumberRange = [
  from: number,
  to: number,
];

/** A named tuple for a given defined range of numbers
 * where the values can be nullable.
 */
export type NullableRange = [
  from: number | null,
  to: number | null,
];

/** A tuple of value with an error, where the value exists 
 * when no error is present and vice versa 
 */
export type ErrorTuple<T, E = Error> = [T, null] | [null, E];
