import { Arr, HTTP_URL, Obj } from '../../TypeUtils';
import { CommonFileAPI } from './_shared';

import type { I_$JSONFile } from './JSONFile.types';
import type { FilePath, FileType } from './FileExtensions.types';

export class $JSONFile<T extends FilePath<FileType.JSON>, Struct extends Obj | Arr>
  extends CommonFileAPI<T>
  implements I_$JSONFile<Struct>
{
  constructor (readonly path: T) {
    super(path);

    if (!path.endsWith('.json'))
      throw new Error('The file path does not refer to a JSON file.');
  }

  async read (): Promise<Struct> {
    return this._read().then((data) => JSON.parse(data));
  }

  async write (content: Struct): Promise<void> {
    const convertedContent = JSON.stringify(content, (_key, value) => {
      if (value instanceof Date) return value.toISOString();
      if (typeof value === 'bigint') return value.toString();
      return value; // return everything else unchanged
    });

    return this._write(convertedContent);
  }

  async fetch (url: HTTP_URL): Promise<Struct> {
    return this._fetchFrom(url)
      .then((data) => JSON.parse(data));
  }

  async download (url: HTTP_URL): Promise<Struct> {
    return this._downloadFrom(url)
      .then(() => this.read());
  }
}