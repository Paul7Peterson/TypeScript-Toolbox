import { green, red, yellow } from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

import { CommonAPI, doesExist } from '../_shared';
import {
  deleteFolderContent,
  getFileName,
  getFilePaths,
  isFolder,
  logFolderIssue,
  removeFilesPerExtensionFromFolder,
} from './Folder.helpers';

import type { FileName } from '../File';

import type { IFolderAPI } from './Folder.types';

export class $Folder extends CommonAPI implements IFolderAPI {
  constructor (readonly directory: string) {
    super(directory);

    if (doesExist(directory) && !isFolder(directory))
      throw new Error(red`The path "${path}" does not point to a folder.`);
  }

  removeFilesPerExtension (fileExtensions: FileName | FileName[], recursive?: 'recursive', consoleLog?: 'log'): Promise<void> {
    return removeFilesPerExtensionFromFolder(fileExtensions, recursive, this.directory, consoleLog);
  }

  async delete (consoleLog?: 'log'): Promise<void> {
    if (!doesExist(this.directory))
      consoleLog && logFolderIssue(red, 'doesn\'t exist:', this.directory);
    else {
      await deleteFolderContent(this.directory);
      fs.rmdirSync(this.directory);
      consoleLog && logFolderIssue(yellow, 'removed', this.directory);
    }

    return Promise.resolve();
  }

  deleteContent (consoleLog?: 'log'): Promise<void> {
    return deleteFolderContent(this.directory, consoleLog);
  }

  create (consoleLog?: 'log'): Promise<void> {
    if (doesExist(this.directory))
      consoleLog && logFolderIssue(yellow, 'already exists', this.directory);
    else {
      fs.mkdirSync(this.directory, { recursive: true });
      consoleLog && logFolderIssue(green, 'created', this.directory);
    }
    return Promise.resolve();
  }

  listFiles (nameOption?: 'trimmed'): string[] {
    return nameOption
      ? getFilePaths(this.directory).map(path => getFileName(path))
      : getFilePaths(this.directory);
  }
}



