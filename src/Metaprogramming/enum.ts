import { parseObject } from './parsers';

/** */
export function newEnum (name: string, lines: string[]): string[] {
  return [
    ...newConstObject(name, lines),
    `export type ${name} = typeof ${name}[keyof typeof ${name}];`,
    '',
  ];
}

/** */
export function newConstObject (name: string, content: string[] | Object): string[] {
  if (Array.isArray(content)) {
    return [
      '/** */',
      `export const ${name} = {`,
      ...content,
      '} as const;',
      '',
    ];
  } else {
    return [
      '/** */',
      `export const ${name} = ${parseObject(content)} as const;`,
      '',
    ];
  }
}