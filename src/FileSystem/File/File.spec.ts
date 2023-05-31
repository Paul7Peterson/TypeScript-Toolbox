import * as fs from 'fs';
import * as path from 'path';

import { aClass, aMethod } from '@paul7peterson/typescript-toolbox';
import { doesExist, joinPath } from '../_shared/_shared.helpers';
import { $File } from './File';

const TEST_DIRECTORY = path.join(__dirname, '__tests__');

const FILE_CONTENT = JSON.stringify({ content: 'This is my file content' });

describe(aClass($File), () => {
  describe(aMethod($File, 'read'), () => {
    const FILE_PATH = `${TEST_DIRECTORY}/File_FileToBeRead.txt` as const;

    beforeEach(() => {
      if (!doesExist(FILE_PATH)) fs.writeFileSync(FILE_PATH, FILE_CONTENT);
    });

    afterEach(() => {
      if (doesExist(FILE_PATH)) fs.rmSync(FILE_PATH);
    });

    it('reads content of given file', async () => {
      const content = await new $File(FILE_PATH).read();

      expect(content).toEqual(FILE_CONTENT);
    });
  });

  describe(aMethod($File, 'write'), () => {
    const FILE_PATH = joinPath(TEST_DIRECTORY, 'File_FileToBeWritten.txt');

    afterEach(() => {
      if (doesExist(FILE_PATH)) fs.rmSync(FILE_PATH);
    });

    it('creates a file at the given target location and writes content into it', async () => {
      const before = doesExist(FILE_PATH);

      await new $File(FILE_PATH).write(FILE_CONTENT);

      const after = doesExist(FILE_PATH);

      const content = await new Promise<string>((resolve, reject) => {
        fs.readFile(FILE_PATH, (error, data) => {
          if (error) reject(error);
          resolve(data.toString('utf8'));
        });
      });

      expect(before).toEqual(false);
      expect(after).toEqual(true);
      expect(content).toEqual(FILE_CONTENT);
    });
  });

  describe(aMethod($File, 'fetch'), () => {
    it.skip('fetches a file from a given url', () => {
    });
  });

  describe(aMethod($File, 'download'), () => {
    it.skip('download a file from a given url', () => {
    });
  });
});
