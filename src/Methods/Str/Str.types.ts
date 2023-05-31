import type { Str } from '@rimbu/typical';

import type { ArrayElement } from '../../TypeUtils';
import type {
  FirstOf,
  LastOf,
  NoFileExtension,
  Split,
  StrPosition,
  ReplaceAllIf,
} from '../../TypeUtils/String.types';

import type {
  KebabCase,
  SnakeCase,
  BoaCase,
  CamelCase,
  PascalCase,
} from '../../TypeUtils/StringCases.types';

import type { $StringArrayAPI } from '../Array';

export interface IStrCase<T extends string> {
  /** */
  readonly kebab: KebabCase<T>;
  /** */
  readonly snake: SnakeCase<T>;
  /** */
  readonly boa: BoaCase<T>;
  /** */
  readonly camel: CamelCase<T>;
  /** */
  readonly pascal: PascalCase<T>;
  /** */
  readonly upper: Uppercase<T>;
  /** */
  readonly lower: Lowercase<T>;
  /** */
  readonly capitalize: Capitalize<T>;
  /** */
  readonly uncapitalize: Uncapitalize<T>;
}

/** */
interface $StrStringAPI<T extends string> {
  /** */
  readonly length: Str.Length<T>;
  /** */
  at<P extends StrPosition<T> & number> (
    position: P,
  ): $StrAPI<P extends number ? T[P] : ''>;
  /** */
  charAt<P extends StrPosition<T>> (
    position: P,
  ): P extends number ? Str.CharAt<T, P> : never;
  // charCodeAt: (...args) => string,
  // codePointAt: (...args) => string,
  /** */
  indexOf<S extends string & Str.NonEmptyString<S>, P extends StrPosition<T>> (
    searchString: S,
    position?: P,
  ): P extends number ? boolean : boolean;
  /** */
  includes<S extends string & Str.NonEmptyString<S>, P extends StrPosition<T>> (
    searchString: S,
    position?: P,
  ): P extends number ? boolean : Str.Contains<T, S>;
  /** */
  replaceAll<F extends string & Str.NonEmptyString<F>, S extends string & Str.NonEmptyString<S>> (
    exp: F,
    withExp: S,
  ): $StrAPI<ReplaceAllIf<T, F, S>>;

  /** */
  replace<F extends string & Str.NonEmptyString<F>, S extends string & Str.NonEmptyString<S>> (
    exp: F,
    withExp: S,
  ): $StrAPI<Str.ReplaceFirst<T, F, S>>;
  /** */
  split<S extends string> (
    separator: T,
  ): $StringArrayAPI<ArrayElement<Split<T, S>>>;
  /** */
  startsWith<P extends StrPosition<T>> (
    searchString: string,
    position?: P,
  ): boolean;
  /** */
  trim (): $StrAPI<string>;
  /** */
  trimEnd (): $StrAPI<string>;
  /** */
  trimLeft (): $StrAPI<string>;
  /** */
  trimRight (): $StrAPI<string>;
  /** */
  trimStart (): $StrAPI<string>;
  /** */
  toLowerCase (): $StrAPI<Lowercase<T>>;
  /** */
  toUpperCase (): $StrAPI<Uppercase<T>>;
  /** */
  toString (): T;
  /** */
  endsWith<P extends string> (pattern: P): boolean;
  /** */
  valueOf (): T;
}

/** */
export interface $StrAPI<T extends string> extends $StrStringAPI<T> {
  /** */
  readonly case: {
    /** */
    kebab (): $StrAPI<KebabCase<T>>;
    /** */
    snake (): $StrAPI<SnakeCase<T>>;
    /** */
    boa (): $StrAPI<BoaCase<T>>;
    /** */
    camel (): $StrAPI<CamelCase<T>>;
    /** */
    pascal (): $StrAPI<PascalCase<T>>;
    /** */
    upper (): $StrAPI<Uppercase<T>>;
    /** */
    lower (): $StrAPI<Lowercase<T>>;
    /** */
    capitalize (): $StrAPI<Capitalize<T>>;
    /** */
    uncapitalize (): $StrAPI<Uncapitalize<T>>;
  };
  /** */
  readonly first: {
    /** */
    bySeparator<S extends string> (separator: S): $StrAPI<FirstOf<T, S>>;
    /** */
    beforeUnderscore (): $StrAPI<FirstOf<T, '_'>>;
    /** */
    word (): $StrAPI<FirstOf<T, ' '>>;
    /** */
    beforeSlash (): $StrAPI<FirstOf<T, '/'>>;
  };
  /** */
  readonly last: {
    /** */
    bySeparator<S extends string> (separator: S): $StrAPI<LastOf<T, S>>;
    /** */
    afterUnderscore (): $StrAPI<LastOf<T, '_'>>;
    /** */
    word (): $StrAPI<LastOf<T, ' '>>;
    /** */
    afterSlash (): $StrAPI<LastOf<T, '/'>>;
  };
  /** */
  readonly value: T;

  /** Removes all the target string patterns. */
  removeAll<F extends string & Str.NonEmptyString<F>> (exp: F): $StrAPI<Str.FilterNot<T, F>>;
  /** Removes the extension of a string. This means the string after the last `.` and the dot. */
  removeExtension (): NoFileExtension<T>;
  /** */
  fileNameWithoutExtension (): LastOf<`${NoFileExtension<T>}`, '/'>;
  /** Returns an overloaded `$Array` with each of the characters of the given string in order. */
  spell (): $StringArrayAPI<ArrayElement<Split<T, ''>>>;
  /** */
  reverse (): $StrAPI<Str.Reverse<T>>;
}
