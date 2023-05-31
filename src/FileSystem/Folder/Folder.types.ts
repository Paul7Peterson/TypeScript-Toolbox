import type { FileName } from '../File';
import type { ICommonAPI } from '../_shared';

export interface IFolderAPI extends ICommonAPI {
  /**
   * Removes all files in the given directory that include the specified file extension.
   * @param consoleLog disables the console.logs if set to 'log'
   */
  removeFilesPerExtension (fileExtensions: FileName | FileName[], recursive?: 'recursive', consoleLog?: 'log'): Promise<void>;
  /**
   * Deletes the folder
   * @param consoleLog disables the console.logs if set to 'log'
   */
  delete (consoleLog?: 'log'): Promise<void>;
  /**
   * Deletes all the content of the given directory
   * @param consoleLog disables the console.logs if set to 'log'
   */
  deleteContent (consoleLog?: 'log'): Promise<void>;
  /**
   * Creates the folder
   * @param consoleLog disables the console.logs if set to 'log'
   */
  create (consoleLog?: 'log'): Promise<void>;
  /**
   * Returns the paths of all files within the folder
   * @param nameOption if set to 'trimmed' the function only returns the name of the files
   */
  listFiles (nameOption?: 'trimmed'): string[];
}
