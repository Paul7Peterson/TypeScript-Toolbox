import type { BoaCase, CamelCase, KebabCase, PascalCase, SnakeCase } from '../../TypeUtils/StringCases.types';
import { $StringArray } from '../Array/Array';
import { first, last, removeAll, removeExtension, replaceAll, reverse } from './Str.helpers';
import { StrCase } from './StrCase';

import type { Str } from '@rimbu/typical';

import type { ArrayElement } from '../../TypeUtils';
import type {
  LastOf,
  NoFileExtension,
  Split,
  StrPosition,
  ReplaceAllIf,
  FirstOf,
} from '../../TypeUtils/String.types';

import type { $StrAPI } from './Str.types';
import type { $StringArrayAPI } from '../Array';
/** */
export function $Str<T extends string> (str: T): $StrAPI<T> {
  return new StrAPI<T>(str) as any;
}

class StrAPI<T extends string> implements $StrAPI<T> {
  readonly #strCase: StrCase<T>;

  constructor (readonly value: T) {
    this.#strCase = new StrCase<T>(value);
  }

  get case (): $StrAPI<T>['case'] {
    const strCase = this.#strCase;

    return {
      kebab (): StrAPI<KebabCase<T>> { return new StrAPI(strCase.kebab); },
      snake (): $StrAPI<SnakeCase<T>> { return new StrAPI(strCase.snake); },
      boa (): $StrAPI<BoaCase<T>> { return new StrAPI(strCase.boa); },
      camel (): $StrAPI<CamelCase<T>> { return new StrAPI(strCase.camel); },
      pascal (): $StrAPI<PascalCase<T>> { return new StrAPI(strCase.pascal); },
      upper (): $StrAPI<Uppercase<T>> { return new StrAPI(strCase.upper); },
      lower (): $StrAPI<Lowercase<T>> { return new StrAPI(strCase.lower); },
      capitalize (): $StrAPI<Capitalize<T>> { return new StrAPI(strCase.capitalize); },
      uncapitalize (): $StrAPI<Uncapitalize<T>> { return new StrAPI(strCase.uncapitalize); },
    };
  }

  get first (): $StrAPI<T>['first'] {
    const str = this.value;
    return {
      bySeparator<S extends string> (separator: S): $StrAPI<FirstOf<T, S>> {
        return new StrAPI(first(str, separator));
      },
      beforeUnderscore (): $StrAPI<FirstOf<T, '_'>> {
        return new StrAPI(first(str, '_'));
      },
      word (): $StrAPI<FirstOf<T, ' '>> {
        return new StrAPI(first(str, ' '));
      },
      beforeSlash (): $StrAPI<FirstOf<T, '/'>> {
        return new StrAPI(first(str, '/'));
      },
    };
  }

  get last (): $StrAPI<T>['last'] {
    const str = this.value;
    return {
      bySeparator<S extends string> (separator: S): $StrAPI<LastOf<T, S>> {
        return new StrAPI(last(str, separator));
      },
      afterUnderscore (): $StrAPI<LastOf<T, '_'>> {
        return new StrAPI(last(str, '_'));
      },
      word (): $StrAPI<LastOf<T, ' '>> {
        return new StrAPI(last(str, ' '));
      },
      afterSlash (): $StrAPI<LastOf<T, '/'>> {
        return new StrAPI(last(str, '/'));
      },
    };
  }

  get length (): Str.Length<T> {
    return this.value.length as any;
  }

  removeAll<F extends string & Str.NonEmptyString<F>> (exp: F): $StrAPI<Str.FilterNot<T, F>> {
    return $Str(removeAll(this.value, exp));
  }
  removeExtension (): ReturnType<$StrAPI<T>['removeExtension']> {
    return removeExtension(this.value) as any;
  }
  fileNameWithoutExtension (): ReturnType<$StrAPI<T>['fileNameWithoutExtension']> {
    return last(removeExtension(this.value), '/') as any;
  }
  spell (): $StringArrayAPI<ArrayElement<Split<T, ''>>> {
    return new $StringArray(this.value.split('') as any);
  }
  reverse (): $StrAPI<Str.Reverse<T>> {
    return new StrAPI(reverse(this.value));
  }
  at<P extends StrPosition<T> & number> (
    position: P,
  ): $StrAPI<P extends number ? T[P] : ''> {
    return new StrAPI(this.value.at(position) || '') as any;
  }
  charAt<P extends StrPosition<T>> (
    position: P,
  ): P extends number ? Str.CharAt<T, P> : never {
    return this.value.charAt(position) as any;
  }
  indexOf<S extends string & Str.NonEmptyString<S>, P extends StrPosition<T>> (
    searchString: S,
    position?: P,
  ): P extends number ? boolean : boolean {
    return this.value.indexOf(searchString, position) as any;
  }
  includes<S extends string & Str.NonEmptyString<S>, P extends StrPosition<T>> (
    searchString: S,
    position?: P,
  ): P extends number ? boolean : Str.Contains<T, S> {
    return this.value.includes(searchString, position) as any;
  }
  replaceAll<F extends string & Str.NonEmptyString<F>, S extends string & Str.NonEmptyString<S>> (
    exp: F,
    withExp: S,
  ): $StrAPI<ReplaceAllIf<T, F, S>> {
    return $Str(replaceAll(this.value, exp, withExp));
  }
  replace<F extends string & Str.NonEmptyString<F>, S extends string & Str.NonEmptyString<S>> (
    exp: F,
    withExp: S,
  ): $StrAPI<Str.ReplaceFirst<T, F, S>> {
    return this.value.replace(exp, withExp) as any;
  }
  split<S extends string> (
    separator: T,
  ): $StringArrayAPI<ArrayElement<Split<T, S>>> {
    return new $StringArray(this.value.split(separator)) as any;
  }
  startsWith<P extends StrPosition<T>> (
    searchString: string,
    position?: P,
  ): boolean {
    return this.value.startsWith(searchString, position);
  }
  trim (): $StrAPI<string> {
    return new StrAPI(this.value.trim());
  }
  trimEnd (): $StrAPI<string> {
    return new StrAPI(this.value.trimEnd());
  }
  trimLeft (): $StrAPI<string> {
    return new StrAPI(this.value.trimLeft());
  }
  trimRight (): $StrAPI<string> {
    return new StrAPI(this.value.trimRight());
  }
  trimStart (): $StrAPI<string> {
    return new StrAPI(this.value.trimStart());
  }
  toLowerCase (): $StrAPI<Lowercase<T>> {
    return new StrAPI(this.#strCase.lower);
  }
  toUpperCase (): $StrAPI<Uppercase<T>> {
    return new StrAPI(this.#strCase.upper);
  }
  toString (): T {
    return this.value;
  }
  endsWith<P extends string> (pattern: P): boolean {
    return this.value.endsWith(pattern);
  }
  valueOf (): T {
    return this.value;
  }
}
