import type * as fs from 'fs';
import type { ExtractFileExtension } from '../../TypeUtils';

import type { FilePath } from './FileExtensions.types';
import type { ICommonAPI } from '../_shared';
import type { I_$Stream } from '../Stream';

export type OtherSupportedFileExtensions =
  Exclude<FilePath.Any, FilePath.JSON>;

/** */
export interface ICommonFileAPI<T extends FilePath.Any> extends ICommonAPI {
  /** */
  readonly stream: I_$Stream;
  /** Milliseconds since creation */
  readonly lifeSpan: number,
  /** Milliseconds since last modification */
  readonly modificationSpan: number,
  /** File’s last modification time */
  readonly lastModified: Date;
  /** File’s last modification time */
  readonly lastAccess: Date;
  /** File’s creation time */
  readonly createdAt: Date;
  /** File total size in bytes */
  readonly size: number;
  /** */
  readonly name: string;
  /** */
  readonly path: T;
  /** */
  readonly extension: ExtractFileExtension<T>;
  /** */
  create (consoleLog?: 'log'): Promise<void>;
  /** */
  delete (consoleLog?: 'log'): Promise<void>;
  /** Provides the name of the file's folder */
  getFolderName (): string;
  /** Creates a folder */
  createFolderForFile (consoleLog?: 'log'): Promise<void>;
  /** */
  getStats (): fs.Stats;
}