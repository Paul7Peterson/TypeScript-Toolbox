/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Str } from '@rimbu/typical';

import { HTTP_URL } from './String.types';

const HTTP_URL_REGEX = RegExp('^(http|https)://', 'i');

/** Checks and casts if a variable is a string */
export function isString (str: unknown): str is string {
  return typeof str === 'string';
}

/** Checks and casts if a variable is a single character */
export function isChar (str: unknown): str is string & { length: 1; } {
  return isString(str) && str.length === 1;
}

/** Checks and casts if a variable is URL */
export function isHTTP_URL (str: unknown): str is HTTP_URL {
  return isString(str) && HTTP_URL_REGEX.test(str);
}

/** Checks and casts if a string is not empty */
export function isNotEmptyString<T extends string> (str: T): str is T & Str.NonEmptyString<T> {
  return str !== '';
}
