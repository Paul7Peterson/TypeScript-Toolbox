import { cyan, red } from 'chalk';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';

import { CommonAPI, doesExist } from '../_shared';
import { $Folder } from '../Folder';
import { $Stream } from '../Stream';
import { buildFileMessage, createFile, deleteFile, getFolderName, isFile, logFileIssue } from './_shared.helpers';

import type { ICommonFileAPI } from './_shared.types';
import type { ExtractFileExtension, HTTP_URL } from '../../TypeUtils';
import type { I_$Stream } from '../Stream';
import type { FilePath } from './FileExtensions.types';
/** */
export abstract class CommonFileAPI<T extends FilePath.Any>
  extends CommonAPI
  implements ICommonFileAPI<T>
{
  constructor (readonly path: T) {
    super(path);

    if (doesExist(path) && !isFile(path))
      throw new Error(red`The path "${path}" does not point to a file.`);
  }

  get size (): number { return fs.statSync(this.path).size; }

  get extension (): ExtractFileExtension<T> { return this.path.split('.').at(-1) as any; }

  get name (): string {
    const a = this.path.split('/');
    const b = this.path.split('\\');
    return a.length > b.length ? (a.at(-1) || '') : (b.at(-1) || '');
  }

  get lastModified (): Date { return fs.statSync(this.path).mtime; }

  get lastAccess (): Date { return fs.statSync(this.path).atime; }

  get createdAt (): Date { return fs.statSync(this.path).birthtime; }

  get lifeSpan (): number { return Date.now() - this.lastAccess.getTime(); }

  get modificationSpan (): number { return Date.now() - this.lastModified.getTime(); }

  get stream (): I_$Stream { return new $Stream(this.path); }

  create (consoleLog?: 'log'): Promise<void> {
    return createFile(this.path, consoleLog);
  }
  delete (consoleLog?: 'log'): Promise<void> {
    return deleteFile(this.path, consoleLog);
  }
  getFolderName (): string {
    return getFolderName(this.path);
  }
  async createFolderForFile (consoleLog?: 'log'): Promise<void> {
    return new $Folder(getFolderName(this.path)).create(consoleLog);
  }

  protected async _read (): Promise<string> {
    if (!doesExist(this.path))
      throw new Error(buildFileMessage(red, 'cannot be read (doesn\'t exist)', this.path));

    return new Promise<string>((resolve, reject) => {
      fs.readFile(this.path, (error, data) => {
        if (error) reject(error);
        resolve(data.toString('utf8'));
      });
    });
  }

  protected async _write (content: string, options?: fs.WriteFileOptions, consoleLog?: 'log'): Promise<void> {
    try {
      await this.createFolderForFile(consoleLog);
      fs.writeFileSync(this.path, content, options);
      consoleLog && logFileIssue(cyan, 'written', this.path);
      return Promise.resolve();
    } catch (error) {
      console.log(buildFileMessage(red, 'error writing', this.path));
      throw error;
    }
  }

  protected async _downloadFrom (url: HTTP_URL, consoleLog?: 'log'): Promise<void> {
    await this.createFolderForFile(consoleLog);

    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(this.path);
      const query = url.startsWith('https') ? https : http;

      query.get(url, (response) => {
        response.pipe(file);

        file.on('finish', () => {
          file.close(); // close() is async, call cb after close completes.
          resolve();
        });
      }).on('error', (err) => {
        fs.unlink(this.path, (e) => reject(e));
        reject(err);
      });
    });
  }

  protected async _fetchFrom (url: HTTP_URL): Promise<string> {
    const query = url.startsWith('https') ? https : http;

    return new Promise((resolve) => {
      query.get(url, (response) => {
        let data = '';

        response
          .setEncoding('utf8')
          .on('data', (chunk) => { data += chunk; })
          .on('end', () => {
            if (response.statusCode === 200)
              return resolve(data);
            throw new Error(data);
          });
      });
    });
  }
}