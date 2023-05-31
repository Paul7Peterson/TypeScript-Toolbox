import { ReplaceAllIf } from '../../TypeUtils';
import { $Str } from '../Str';

/** */
export function underscorePerSpace<T extends string> (text: T): ReplaceAllIf<T, '_', ' '> {
  return $Str(text).replaceAll('_', ' ').value;
}

/** */
export function spacePerUnderScore<T extends string> (text: T): ReplaceAllIf<T, ' ', '_'> {
  return $Str(text).replaceAll(' ', '_').value;
}

/** */
export function hyphenPerSpace<T extends string> (text: T): ReplaceAllIf<T, '-', ' '> {
  return $Str(text).replaceAll('-', ' ').value;
}

/** */
export function spacePerHyphen<T extends string> (text: T): ReplaceAllIf<T, ' ', '-'> {
  return $Str(text).replaceAll(' ', '-').value;
}
