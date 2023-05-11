/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { Num } from '@rimbu/typical';

/** Includes the literals for [0-9] */
export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/** Returns the next number as literal type.
 * The value must be an integer.
 *
 * @example
 * ```ts
 * type _1 = Next<3>;         ; type _1 = 4;
 * type _2 = Next<4.5>;       ; type _2 = never;
 * ``` 
 */
export type Next<N extends number> =
  Num.Inc<N>;

/** Returns the previous number as literal type.
 * The value must be an integer.
 *
 * @example
 * ```ts
 * type _1 = Next<3>;         ; type _1 = 2;
 * type _2 = Next<4.5>;       ; type _2 = never;
 * ``` 
 */
export type Prev<N extends number> =
  Num.Subtract<N, 1>;

/** Add two numbers as types.
 * The values must be integers.
 *
 * @example
 * ```ts
 * type _1 = Add<2, 5>;       ; type _1 = 7;
 * type _2 = Add<2.5, 5>;     ; type _2 = never;
 * ``` 
 */
export type Add<N1 extends number, N2 extends number> = Num.Add<N1, N2>;


type PrependNextNum<A extends unknown[]> = A['length'] extends infer T
  ? ((t: T, ...a: A) => void) extends (...x: infer X) => void
  ? X
  : never
  : never;

type EnumerateInternal<A extends unknown[], N extends number> = {
  0: A;
  1: EnumerateInternal<PrependNextNum<A>, N>;
}[N extends A['length'] ? 0 : 1];

/** Provides a literal of numbers from `0` until the previous one to the given.
 * The value must be an integer.
 * 
 * * @example
 * ```ts
 * type _1 = Enumerate<5>;    ; type _1 = 0 | 1 | 2 | 3 | 4
 * type _2 = Enumerate<5.5>;  ; type _2 = ❌
 * ``` 
 */
export type Enumerate<N extends number> =
  EnumerateInternal<[], N> extends (infer E)[] ? E : never;
