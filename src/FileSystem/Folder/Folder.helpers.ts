import { red } from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

import { FileName, FilePath } from '../File';
import { deleteFile, isFile } from '../File/_shared.helpers';
import { doesExist, joinPath } from '../_shared';

/** */
export function buildFolderMessage (color: (...text: unknown[]) => string, text: string, path: string): string {
  return `📁 ${color`Folder ${text}:`} \n"${path}"`;
}

/** */
export function logFolderIssue (color: (...text: unknown[]) => string, text: string, path: string): void {
  console.log(buildFolderMessage(color, text, path));
}

/**
 * Removes the content of the target directory.
 * @param consoleLog disables the console.logs if set to 'log'
 */
export async function deleteFolderContent (directory: string, consoleLog?: 'log'): Promise<void> {
  if (!doesExist(directory)) return;

  await Promise.all(fs.readdirSync(directory).map(async (file) => {
    const filePath = joinPath(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile())
      await deleteFile(filePath as FilePath<FileName>, consoleLog);
    else if (isFolder(filePath))
      await deleteFolderContent(filePath, consoleLog);

    Promise.resolve();
  }));
}

/**
 * Removes all files with the given file extension from the target directory.
 * @param consoleLog disables the console.logs if set to 'log'
 */
export async function removeFilesPerExtensionFromFolder<T extends string> (
  fileExtensions: FileName | FileName[],
  recursive: 'recursive' | undefined,
  directory: T,
  consoleLog?: 'log',
): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    if (!doesExist(directory)) resolve();

    try {
      await Promise.all(fs.readdirSync(directory).map(async (file) => {
        const filePath = joinPath(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile()) {
          const isTargetFile: boolean = typeof fileExtensions === 'string'
            ? file.includes(fileExtensions)
            : fileExtensions.some((fe) => file.includes(fe));

          if (isTargetFile) return deleteFile(filePath as FilePath<FileName>, consoleLog);
        }
        else if (stat.isDirectory() && recursive)
          await removeFilesPerExtensionFromFolder(fileExtensions, recursive, filePath, consoleLog);

        Promise.resolve();
      }));

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Returns paths of all files in the target directory.
 * @param dirPath path to the target directory
 */
export function getFilePaths (dirPath: string): string[] {
  if (!doesExist(dirPath)) return [];

  return fs.readdirSync(dirPath).reduce((t, file) => {
    if (fs.statSync(dirPath + '/' + file).isDirectory())
      return [...t, ...getFilePaths(dirPath + '/' + file)];

    t.push(path.join(dirPath, '/', file));
    return t;
  }, [] as string[]);
}

/**
 * Returns the file name without the path
 * @param filePath
 * @returns
 */
export function getFileName (filePath: string): string {
  return filePath.split(getSeparator(filePath)).at(-1) || '';
}

/** Returns true if target is a folder otherwise it returns false. */
export function isFolder (directory: string): boolean {
  return doesExist(directory) && fs.statSync(directory).isDirectory();
}

export function copyFolder (sourcePath: string, targetPath: string): boolean {
  if (!isFolder(sourcePath)) throw Error(red`Target is not a folder!`);

  const targetDirectory = path.join(targetPath, getFileName(sourcePath));
  fs.mkdirSync(targetDirectory, { recursive: true });
  const filePaths = getFilePaths(sourcePath);

  filePaths.forEach((file) => {
    if (isFile(file)) {
      const newFilePath = file.replace(sourcePath, targetDirectory);
      const { path } = splitFilePathAndName(newFilePath);

      if (!doesExist(path)) fs.mkdirSync(path);

      fs.copyFileSync(file, newFilePath);
    }
  });
  return true;
}

/**
 * Returns an object containing the path, name and extension of the given file
 * @param filePath
 * @returns
 */
export function splitFilePathAndName (filePath: string): { path: string, fileName: string, extension: string; } {
  const separatorIndex = filePath.lastIndexOf(getSeparator(filePath));
  const lastDotIndex = filePath.lastIndexOf('.');

  return {
    path: filePath.substring(0, separatorIndex),
    fileName: filePath.substring(separatorIndex + 1, lastDotIndex),
    extension: filePath.substring(lastDotIndex, filePath.length),
  };
}

function getSeparator (filePath: string): string {
  return filePath.includes('\\') ? '\\' : '/';
}
