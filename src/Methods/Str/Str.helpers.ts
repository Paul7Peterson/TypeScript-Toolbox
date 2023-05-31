import type { Str } from '@rimbu/typical';

import type {
  FirstOf,
  LastOf,
  NoFileExtension,
  ReplaceAllIf,
} from '../../TypeUtils';

import { CamelCase, KebabCase, PascalCase, SnakeCase } from '../../TypeUtils/StringCases.types';

const CAPITALS_PLUS_LOWER = /[A-ZÀ-Ý\u00C0-\u00D6\u00D9-\u00DD][a-zà-ÿ]/g;
const CAPITALS_FOR_KEBAB_CASE = /[A-ZÀ-Ý\u00C0-\u00D6\u00D9-\u00DD]+/g;
const CAPITALS_FOR_SNAKE_CASE = /[A-Z\u00C0-\u00D6\u00D9-\u00DD]/g;
const WORD_SEPARATORS = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-./:;<=>?@[\]^_`{|}~]+/;

const BASIC_CAMEL = /^[a-z\u00E0-\u00FCA-Z\u00C0-\u00DC][\d|a-z\u00E0-\u00FCA-Z\u00C0-\u00DC]*$/;
const fourOrMoreConsecutiveCapsRegEx = /([A-Z\u00C0-\u00DC]{4,})/g;
const ALL_CAPS = /^[A-Z\u00C0-\u00DC]+$/;

/**
 *
 * @link https://github.com/angus-c/just/blob/master/packages/string-kebab-case
 *
 * @example
 * ```ts
 * kebabCase('the quick brown fox'); // 'the-quick-brown-fox'
 * kebabCase('the-quick-brown-fox'); // 'the-quick-brown-fox'
 * kebabCase('the_quick_brown_fox'); // 'the-quick-brown-fox'
 * kebabCase('theQuickBrownFox'); // 'the-quick-brown-fox'
 * kebabCase('theQuickBrown Fox'); // 'the-quick-brown-fox'
 * kebabCase('thequickbrownfox'); // 'thequickbrownfox'
 * kebabCase('the - quick * brown# fox'); // 'the-quick-brown-fox'
 * kebabCase('theQUICKBrownFox'); // 'the-quick-brown-fox'
 * ```
 */
export function kebabCase<T extends string> (str: T): KebabCase<T> {
  return str.replace(CAPITALS_PLUS_LOWER, ([first, second, ..._]) =>
    ' ' + (first.toLowerCase() || first) + second)
    .replace(CAPITALS_FOR_KEBAB_CASE, (match) => ' ' + match.toLowerCase())
    .trim()
    .split(WORD_SEPARATORS)
    .join('-')
    .replace(/^-/, '')
    .replace(/-\s*$/, '') as KebabCase<T>;
}

/** Converts first character of string literal type to uppercase.
 *
 * @link https://github.com/angus-c/just/tree/master/packages/string-capitalize
 *
 * @example
 * ```ts
 * capitalize('capitals'); // 'Capitals'
 * capitalize('Capitals'); // 'Capitals'
 * capitalize('CapiTALS'); // 'CapiTALS'
 * capitalize('many Words'); // 'Many Words'
 * capitalize('!exclaim'); // '!exclaim'
 * ```
 */
export function capitalize<T extends string> (str: T): Capitalize<T> {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
}


/** Converts first character of string literal type to lowercase.
 *
 * @example
 * ```ts
 * uncapitalize('capitals'); // 'capitals'
 * uncapitalize('Capitals'); // 'capitals'
 * uncapitalize('CapiTALS'); // 'capiTALS'
 * uncapitalize('many Words'); // 'many Words'
 * uncapitalize('!exclaim'); // '!exclaim'
 * ```
*/
export function uncapitalize<T extends string> (str: T): Uncapitalize<T> {
  return (str.charAt(0).toLowerCase() + str.slice(1)) as Uncapitalize<T>;
}

/**
 *
 * @link https://github.com/angus-c/just/tree/master/packages/string-pascal-case
 *
 * @example
 * ```ts
 * pascalCase('the quick brown fox'); // 'TheQuickBrownFox'
 * pascalCase('the_quick_brown_fox'); // 'TheQuickBrownFox'
 * pascalCase('the-quick-brown-fox'); // 'TheQuickBrownFox'
 * pascalCase('theQuickBrownFox'); // 'TheQuickBrownFox'
 * pascalCase('thequickbrownfox'); // 'Thequickbrownfox'
 * pascalCase('the - quick * brown# fox'); // 'TheQuickBrownFox'
 * pascalCase('theQUICKBrownFox'); // 'TheQUICKBrownFox'
 * ```
 */
export function pascalCase<T extends string> (str: T): PascalCase<T> {
  const words = str.split(WORD_SEPARATORS);
  const len = words.length;
  const mappedWords = new Array(len);

  for (let i = 0; i < len; i++) {
    const word = words[i];
    if (!word) continue;
    mappedWords[i] = word[0].toUpperCase() + word.slice(1);
  }

  return mappedWords.join('') as PascalCase<T>;
}

/**
 *
 * @link https://github.com/angus-c/just/tree/master/packages/string-snake-case
 *
 * @example
 * ```ts
 * snakeCase('the quick brown fox'); // 'the_quick_brown_fox'
 * snakeCase('the-quick-brown-fox'); // 'the_quick_brown_fox'
 * snakeCase('the_quick_brown_fox'); // 'the_quick_brown_fox'
 * snakeCase('theQuickBrownFox'); // 'the_quick_brown_fox'
 * snakeCase('theQuickBrown Fox'); // 'the_quick_brown_fox'
 * snakeCase('thequickbrownfox'); // 'thequickbrownfox'
 * snakeCase('the - quick * brown# fox'); // 'the_quick_brown_fox'
 * snakeCase('theQUICKBrownFox'); // 'the_q_u_i_c_k_brown_fox'
 * ```
 */
export function snakeCase<T extends string> (str: T): SnakeCase<T> {
  return str
    .replace(CAPITALS_FOR_SNAKE_CASE, (match) => ' ' + (match.toLowerCase() || match))
    .trim()
    .split(WORD_SEPARATORS)
    .join('_') as SnakeCase<T>;
}

/**
 *
 * @link https://github.com/angus-c/just/tree/master/packages/string-camel-case
 *
 * @example
 * ```ts
 * camelCase('the quick brown fox'); // 'theQuickBrownFox'
 * camelCase('the_quick_brown_fox'); // 'theQuickBrownFox'
 * camelCase('the-quick-brown-fox'); // 'theQuickBrownFox'
 * camelCase('theQuickBrownFox'); // 'theQuickBrownFox'
 * camelCase('thequickbrownfox'); // 'thequickbrownfox'
 * camelCase('the - quick * brown# fox'); // 'theQuickBrownFox'
 * camelCase('behold theQuickBrownFox'); // 'beholdTheQuickBrownFox'
 * camelCase('Behold theQuickBrownFox'); // 'beholdTheQuickBrownFox'
 * // all caps words are camel-cased
 * camelCase('The quick brown FOX'), 'theQuickBrownFox');
 * // all caps substrings >= 4 chars are camel-cased
 * camelCase('theQUickBrownFox'); // 'theQUickBrownFox'
 * camelCase('theQUIckBrownFox'); // 'theQUIckBrownFox'
 * camelCase('theQUICKBrownFox'); // 'theQuickBrownFox'
 * ```
 */
export function camelCase<T extends string> (str: T): CamelCase<T> {
  const words = str.split(WORD_SEPARATORS);
  const len = words.length;
  const mappedWords = new Array(len);

  for (let i = 0; i < len; i++) {
    let word = words[i];
    if (!word) continue;

    const isCamelCase = BASIC_CAMEL.test(word) && !ALL_CAPS.test(word);
    if (isCamelCase)
      word = word.replace(fourOrMoreConsecutiveCapsRegEx, (match, _, offset) =>
        deCap(match, !(word.length - offset - match.length)));

    let firstLetter = word[0];
    firstLetter = i ? firstLetter.toUpperCase() : firstLetter.toLowerCase();
    mappedWords[i] = firstLetter + (!isCamelCase ? word.slice(1).toLowerCase() : word.slice(1));
  }

  return mappedWords.join('') as CamelCase<T>;
}

function deCap (match: string, endOfWord: boolean): string {
  const arr = match.split('');
  const first = arr?.shift()?.toUpperCase();
  const last = endOfWord ? arr?.pop()?.toLowerCase() : arr.pop();
  return `${first}${arr.join('').toLowerCase()}${last}`;
}

/** Converts string literal type to uppercase. */
export function upper<T extends string> (str: T): Uppercase<T> {
  return str.toUpperCase() as Uppercase<T>;
}

/** Converts string literal type to lowercase. */
export function lower<T extends string> (str: T): Lowercase<T> {
  return str.toLowerCase() as Lowercase<T>;
}

/** Removes all the target substrings of a given string. */
export function removeAll<T extends string, R extends string & Str.NonEmptyString<R>> (str: T, target: R): Str.FilterNot<T, R> {
  return str.replaceAll(target, '') as Str.FilterNot<T, R>;
}

/** Replaces all the target substrings of a given string with a new substring. */
export function replaceAll<T extends string, R extends string & Str.NonEmptyString<R>, S extends string & Str.NonEmptyString<S>> (
  str: T,
  target: R,
  withExp: S,
): ReplaceAllIf<T, R, S> {
  return str.replaceAll(target, withExp) as ReplaceAllIf<T, R, S>;
}

/** Returns the first substring before the first match of the given separator. */
export function first<T extends string, S extends string> (str: T, separator: S): FirstOf<T, S> {
  return str.split(separator)[0] as FirstOf<T, S>;
}

/** Returns the substring before the last match of given separator. */
export function last<T extends string, S extends string> (str: T, separator: S): LastOf<T, S> {
  const stringArray = str.split(separator);
  return stringArray.slice(1).join(separator) as LastOf<T, S>;
}

/** Removes the extension of a string. This means the string after the last `.` and the dot. */
export function removeExtension<T extends string> (str: T): NoFileExtension<T> {
  return str.substring(0, str.lastIndexOf('.')) as NoFileExtension<T>;
}

/** Reverses a given string. */
export function reverse<T extends string> (str: T): Str.Reverse<T> {
  return str.split('').reverse().join('') as Str.Reverse<T>;
}
