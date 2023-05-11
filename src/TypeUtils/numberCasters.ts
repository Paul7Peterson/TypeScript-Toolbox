/** */
export function isNumber (numb: unknown): numb is number {
  return typeof numb === 'number';
}

/** */
export function parseNumber (numb: unknown): number {
  if (numb === '') throw new Error('An empty string should not be parsed into number');
  if (typeof numb === 'object') throw new Error('An object should not be parsed into number');
  const value = Number(numb);
  if (isNaN(value)) throw new Error(`"${numb}" could not be parsed into number`);

  return value;
}
