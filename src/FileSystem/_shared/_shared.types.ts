import * as fs from 'fs';

export interface ICommonAPI {
  /** */
  getStats (): fs.Stats;
  /** Checks if the target elements exists */
  doesExist (): boolean;
}

