import * as fs from 'fs';

import { aClass, aMethod } from '@paul7peterson/typescript-toolbox';
import { doesExist, joinPath } from '../_shared/';
import { $JSONFile } from './JSONFile';

const TEST_DIRECTORY = joinPath(__dirname, '__tests__');

const FILE_CONTENT = { content: 'This is my file content' };

describe(aClass($JSONFile), () => {
  describe(aMethod($JSONFile, 'read'), () => {
    const READ_FILE = joinPath(TEST_DIRECTORY, 'JSONFile_FileToBeRead.json');

    beforeEach(() => {
      if (!doesExist(READ_FILE)) fs.writeFileSync(READ_FILE, JSON.stringify(FILE_CONTENT));
    });

    afterEach(() => {
      if (doesExist(READ_FILE)) fs.rmSync(READ_FILE);
    });

    it('reads content of given file', async () => {
      const content = await new $JSONFile(READ_FILE).read();

      expect(content).toEqual(FILE_CONTENT);
    });
  });

  describe(aMethod($JSONFile, 'write'), () => {
    const WRITE_FILE = joinPath(TEST_DIRECTORY, 'JSONFile_FileToBeWritten.json');

    afterEach(() => {
      if (doesExist(WRITE_FILE)) fs.rmSync(WRITE_FILE);
    });

    it('creates a file at the given target location and writes content into it', async () => {
      const before = doesExist(WRITE_FILE);

      await new $JSONFile(WRITE_FILE)
        .write(FILE_CONTENT);

      const after = doesExist(WRITE_FILE);

      const content = await new Promise<string>((resolve, reject) => {
        fs.readFile(WRITE_FILE, (error, data) => {
          if (error) reject(error);
          resolve(data.toString('utf8'));
        });
      });

      expect(before).toEqual(false);
      expect(after).toEqual(true);
      expect(content).toEqual(JSON.stringify(FILE_CONTENT));
    });
  });

  describe(aMethod($JSONFile, 'fetch'), () => {
    it.skip('fetches a file from a given url', () => {
    });
  });

  describe(aMethod($JSONFile, 'download'), () => {
    it.skip('download a file from a given url', () => {
    });
  });
});
