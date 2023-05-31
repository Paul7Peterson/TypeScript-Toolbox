import type { IStrCase } from './Str.types';
import type {
  KebabCase,
  SnakeCase,
  BoaCase,
  CamelCase,
  PascalCase,
} from '../../TypeUtils/StringCases.types';

import {
  lower,
  upper,
  camelCase,
  capitalize,
  uncapitalize,
  pascalCase,
  kebabCase,
  snakeCase,
} from './Str.helpers';

/** */
export class StrCase<T extends string> implements IStrCase<T> {
  constructor (
    private readonly _str: T,
  ) { }

  get kebab (): KebabCase<T> { return kebabCase(this._str); }

  get snake (): SnakeCase<T> { return snakeCase(this._str); }

  get boa (): BoaCase<T> { return upper(snakeCase(this._str)) as BoaCase<T>; }

  get camel (): CamelCase<T> { return camelCase(this._str); }

  get pascal (): PascalCase<T> { return pascalCase(this._str); }

  get upper (): Uppercase<T> { return upper(this._str); }

  get lower (): Lowercase<T> { return lower(this._str); }

  get capitalize (): Capitalize<T> { return capitalize(this._str); }

  get uncapitalize (): Uncapitalize<T> { return uncapitalize(this._str); }

  valueOf (): T { return this._str; }
}
