import * as fs from 'fs';
import * as path from 'path';
import { aClass, aMethod } from '@paul7peterson/typescript-toolbox';

import { doesExist, joinPath } from '../_shared/_shared.helpers';
import { $Stream } from './Stream';

const TEST_DIR_ROOT = path.join(__dirname, '__tests__');

describe(aClass($Stream), () => {
  describe(aMethod($Stream, 'createReadStream'), () => {
    const FILE_CONTENT = 'That is my content.';
    const FILE_PATH = joinPath(TEST_DIR_ROOT, 'FileForReadStream.txt');
    let stream: fs.ReadStream;

    beforeEach(() => {
      if (!doesExist(FILE_PATH)) fs.writeFileSync(FILE_PATH, FILE_CONTENT);
    });

    afterEach(() => {
      if (doesExist(FILE_PATH)) stream.close(() => { fs.unlinkSync(FILE_PATH); });
    });

    it('creates a file read stream', () => {
      stream = new $Stream(FILE_PATH).createReadStream();

      expect(stream.path).toEqual(FILE_PATH);
    });
  });

  describe(aMethod($Stream, 'createWriteStream'), () => {
    const FILE_PATH = joinPath(TEST_DIR_ROOT, 'FileForWriteStream.txt');
    let stream: fs.WriteStream;

    beforeEach(() => {
      if (!doesExist(FILE_PATH)) fs.writeFileSync(FILE_PATH, '');
    });

    afterEach(() => {
      if (doesExist(FILE_PATH)) stream.close(() => { fs.unlinkSync(FILE_PATH); });
    });

    it('creates a file write stream', async () => {
      stream = new $Stream(FILE_PATH).createWriteStream();
      expect(stream.path).toEqual(FILE_PATH);
    });
  });

  describe(aMethod($Stream, 'saveDataStream'), () => {
    it.skip('saves file write stream in file', () => {
    });
  });
});
