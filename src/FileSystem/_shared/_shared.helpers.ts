import * as fs from 'fs';
import * as path from 'path';

/** */
export function doesExist (path: string): boolean {
  return fs.existsSync(path);
}

/** */
export function joinPath<T extends string> (prev: string, post: T): `${string}/${T}` {
  return path.join(prev, post) as `${string}/${T}`;
}
