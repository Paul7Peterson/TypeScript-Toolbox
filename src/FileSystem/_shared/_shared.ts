import { Stats, statSync } from 'fs';

import { doesExist } from './_shared.helpers';
import { ICommonAPI } from './_shared.types';

export abstract class CommonAPI implements ICommonAPI {
  constructor (
    private readonly _path: string,
  ) { }

  getStats (): Stats {
    return statSync(this._path);
  }
  doesExist (): boolean {
    return doesExist(this._path);
  }
}
