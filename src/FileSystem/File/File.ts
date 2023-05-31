import * as fs from 'fs';

import { joinLines } from '../../Metaprogramming';
import { HTTP_URL } from '../../TypeUtils';
import { CommonFileAPI } from './_shared';

import type { I_$File } from './File.types';

import type { OtherSupportedFileExtensions } from './_shared.types';
import type { FilePath } from './FileExtensions.types';
export class $File<T extends FilePath<OtherSupportedFileExtensions>>
  extends CommonFileAPI<T>
  implements I_$File {

  constructor (readonly path: T) {
    super(path);

    if (path.endsWith('.json'))
      console.warn('JSON files must use the $JSONFile class.');
  }

  async write (content: string | string[], options?: fs.WriteFileOptions, consoleLog?: 'log'): Promise<void> {
    const parsedContent = typeof content === 'string' ? content : joinLines(content);
    return this._write(parsedContent, options, consoleLog);
  }
  async read (): Promise<string> {
    return this._read();
  }
  async fetch (url: HTTP_URL): Promise<string> {
    return this._fetchFrom(url);
  }
  async download (url: HTTP_URL): Promise<string> {
    return this._downloadFrom(url)
      .then(() => this.read());
  }
}

