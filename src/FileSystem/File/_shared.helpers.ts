import { green, red, yellow } from 'chalk';
import * as fs from 'fs';

import { doesExist } from '../_shared';
import { FileName, FilePath } from './FileExtensions.types';

/** */
export function buildFileMessage (color: (...text: unknown[]) => string, text: string, path: string): string {
  return `📄 ${color`File ${text}:`} \n"${path}"`;
}

/** */
export function logFileIssue (color: (...text: unknown[]) => string, text: string, path: string): void {
  console.log(buildFileMessage(color, text, path));
}

export function getFolderName<P extends FileName> (path: FilePath<P>): string {
  const a = path.lastIndexOf('/');
  const fileNameStart = a === -1 ? path.lastIndexOf('\\') : a;
  if (fileNameStart === -1) throw new Error(`"${path} is not a path."`);
  return path.substring(0, fileNameStart);
}

/** */
export async function createFile<P extends FileName> (path: FilePath<P>, consoleLog?: 'log'): Promise<void> {
  if (doesExist(path))
    consoleLog && logFileIssue(yellow, 'already exists', path);
  else {
    fs.writeFileSync(path, '');
    consoleLog && logFileIssue(green, 'created', path);
  }

  return Promise.resolve();
}

/** */
export async function deleteFile<P extends FileName> (path: FilePath<P>, consoleLog?: 'log'): Promise<void> {
  if (doesExist(path)) {
    fs.unlinkSync(path);
    consoleLog && logFileIssue(yellow, 'removed', path);
  } else if (consoleLog)
    logFileIssue(red, 'cannot be removed (doesn\'t exist)', path);

  return Promise.resolve();
}

/** */
export function isFile (path: string): boolean {
  return doesExist(path) && fs.statSync(path).isFile();
}

