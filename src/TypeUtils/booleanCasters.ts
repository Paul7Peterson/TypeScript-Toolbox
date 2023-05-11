/** Checks and casts if a variable is a boolean */
export function isBoolean (value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/** */
export function parseBoolean (value: unknown): boolean {
  return Boolean(value);
}
