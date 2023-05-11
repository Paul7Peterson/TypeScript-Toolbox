export * from './_shared.types';

export * from './Array.types';
export * from './arrayCasters';

export * from './booleanCasters';

export * from './Class.types';

export * from './Function.types';

export * from './Map.types';
export * from './MapCasters';

export * from './Number.types';
export * from './numberCasters';

export * from './Object.types';
export * from './objectCasters';

export * from './Promise.types';

export * from './String.types';
export * from './stringCasters';


export function isPrimitive (value: unknown): value is number | string | boolean | null {
  return value === null || ['string', 'number', 'boolean'].includes(typeof value);
}