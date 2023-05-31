import type { I_$Stream } from './Stream.types';

import { red } from 'chalk';
import * as fs from 'fs';

import { doesExist } from '../_shared';
import { buildFileMessage, createFile } from '../File/_shared.helpers';

import type { FilePath } from '../File/FileExtensions.types';

/** */
export class $Stream<T extends FilePath.Any> implements I_$Stream {
  constructor (
    private readonly _path: T,
  ) { }

  createWriteStream (): fs.WriteStream {
    if (!doesExist(this._path)) createFile(this._path);
    return fs.createWriteStream(this._path, 'utf-8');
  }
  createReadStream (): fs.ReadStream {
    if (!doesExist(this._path)) throw new Error(buildFileMessage(red, 'couldn\'t be found', this._path));
    return fs.createReadStream(this._path, 'utf-8');
  }
  saveDataStream (stream: NodeJS.ReadableStream): Promise<void> {
    const fileStream = this.createWriteStream();

    return new Promise((resolve) => {
      stream
        .pipe(fileStream)
        .on('finish', (error: Error) => {
          fileStream.close();
          if (error) throw error;
          resolve();
        });
    });
  }
}