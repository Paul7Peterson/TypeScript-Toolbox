import type * as fs from 'fs';
import type { Arr, Obj, HTTP_URL } from '../../TypeUtils';

/** */
export interface I_$JSONFile<Struct extends Arr | Obj> {
  /** */
  read (): Promise<Struct>;
  /** */
  write (content: Struct, options?: fs.WriteFileOptions, consoleLog?: 'log'): Promise<void>;
  /** */
  fetch (url: HTTP_URL): Promise<Struct>;
  /** */
  download (url: HTTP_URL): Promise<Struct>;
}
