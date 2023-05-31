import { isString } from '../TypeUtils';

/** Joins an array of lines into a line broken paragraph */
export function joinLines (lines: (string | undefined | null)[]): string {
  return lines.filter((l) => isString(l))
    .map((l) => l?.trimEnd())
    .join('\n');
}

export function tabsToSpace (tabs: number): string {
  return ' '.repeat(tabs * 2);
}

export function quote (str: string | number): string {
  return `'${str}'`;
}