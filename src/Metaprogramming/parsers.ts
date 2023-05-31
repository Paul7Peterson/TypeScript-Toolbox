import { objectEntries, objectKeys } from '../Methods/Object';
import { Dict, isArray, isObject, isPrimitive, Obj } from '../TypeUtils';
import { joinLines, quote, tabsToSpace } from './_common';

type ParsingPrimitives = null | string | number | boolean | Date;

type ParsingObject = Dict<ParsingPrimitives | ParsingPrimitives[] | Dict<ParsingPrimitives | ParsingPrimitives[]>>;

type Parsing =
  | ParsingPrimitives
  | ParsingPrimitives[]
  | ParsingObject;

export function parsePrimitive (value: ParsingPrimitives, tabs?: number): string {
  if (value === null) return 'null';
  if (value instanceof Date)
    return `new Date('${value.toISOString()}')`;
  switch (typeof value) {
    case 'string': {
      value = value.replaceAll('\'', '\\\'');

      if (!value.includes('\n')) quote(value);
      const space = (tabs && tabsToSpace(tabs + 1)) || '';
      return quote(value.split('\n').join(`\\n' +\n${space}'`));
    }
    case 'boolean':
    case 'number':
      return value.toString();
    default: throw new Error('Unknown type');
  }

}

function parseValue (value: Parsing, tabs: number): string {
  if (value === undefined) throw new Error('A value cannot be undefined');
  if (isPrimitive(value) || value instanceof Date) return parsePrimitive(value, tabs);
  if (isArray(value)) return parseArray(value, tabs);
  if (isObject(value)) return parseObject(value, tabs);
  throw new Error('unknown type to parse');
}

/** */
export function parseArray (array: ParsingPrimitives[], tabs = 0): string {
  if (!array.length) return '[]';

  if (array.length === 1) {
    if (array[0] === undefined) return '[]';
    return `[${parseValue(array[0], tabs + 1)}]`;
  }

  const space = tabsToSpace(tabs);

  return joinLines([
    '[',
    ...array
      .filter((value) => value !== undefined)
      .map((value) => `${space}  ${parseValue(value, tabs + 1)},`),
    `${space}]`,
  ]);
}

function keyParser (key: string): string {
  return (key.includes('.') || key.includes('-')) ? quote(key) : key;
}

/** */
export function parseObject (obj: Obj, tabs = 0): string {
  if (!objectKeys(obj).length) return '{}';

  if (objectKeys(obj).length === 1) {
    const [key, value] = objectEntries(obj)[0];
    if (value === undefined) return '{}';
    return `{ ${keyParser(key)}: ${parseValue(value, tabs + 1)} }`;
  }

  const space = tabsToSpace(tabs);

  return joinLines([
    '{',
    ...objectEntries(obj)
      .filter(([_, value]) => value !== undefined)
      .flatMap(([key, value]) => [`${space}  ${keyParser(key)}: ${parseValue(value, tabs + 1)},`]),
    `${space}}`,
  ]);
}
