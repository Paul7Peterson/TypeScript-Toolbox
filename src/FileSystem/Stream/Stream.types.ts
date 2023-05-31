import type * as fs from 'fs';

export interface I_$Stream {
  /** */
  createWriteStream (): fs.WriteStream;
  /** */
  createReadStream (): fs.ReadStream;
  /** */
  saveDataStream (stream: NodeJS.ReadableStream): Promise<void>;
}