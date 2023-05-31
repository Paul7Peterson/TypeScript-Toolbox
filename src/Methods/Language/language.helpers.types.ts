import type { Str } from '@rimbu/typical';

import type { ReplaceAllIf } from '../../TypeUtils/String.types';

/** */
export type Case = 'upper' | 'lower';

/** */
export type ToUmlautReturn<T extends string> =
  ReplaceAllIf<Str.ReplaceAll<Str.ReplaceAll<T, 'ae', 'ä'>, 'oe', 'ö'>, 'ue', 'ü'>;

/** */
export type SetUmlautsReturn<T extends string, C extends Case> =
  C extends 'lower'
  ? ToUmlautReturn<Lowercase<T>>
  : ReplaceAllIf<Str.ReplaceAll<Str.ReplaceAll<Uppercase<T>, 'AE', 'Ä'>, 'OE', 'Ö'>, 'UE', 'Ü'>;

/** */
export type RemoveUmlautsReturn<T extends string, C extends Case> =
  C extends 'lower'
  ? ReplaceAllIf<Str.ReplaceAll<Str.ReplaceAll<Lowercase<T>, 'ä', 'ae'>, 'ö', 'oe'>, 'ü', 'ue'>
  : ReplaceAllIf<Str.ReplaceAll<Str.ReplaceAll<Uppercase<T>, 'Ä', 'AE'>, 'Ö', 'OE'>, 'Ü', 'UE'>;
