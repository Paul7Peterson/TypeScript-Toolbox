import type * as fs from 'fs';
import type { HTTP_URL } from '../../TypeUtils';

/** */
export interface I_$File {
  /** Writes the given content in a `<fileName>` file */
  write (content: string | string[], options?: fs.WriteFileOptions, consoleLog?: 'log'): Promise<void>;
  /** Returns the file content as a string */
  read (): Promise<string>;
  /** */
  fetch (url: HTTP_URL): Promise<string>;
  /** */
  download (url: HTTP_URL): Promise<string>;
}
