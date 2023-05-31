import * as fs from 'fs';

import { aFunction } from '@paul7peterson/typescript-toolbox';
import { doesExist, joinPath } from '../_shared/_shared.helpers';
import { createFile, deleteFile, getFolderName, isFile } from './_shared.helpers';
import { FilePath } from './FileExtensions.types';

const TEST_DIR_ROOT = joinPath(__dirname, '__tests__');

const THIS_FILE = __filename as FilePath.Any;


describe(aFunction(getFolderName), () => {
  it('returns path of directory containing the given file', () => {
    expect(getFolderName(THIS_FILE)).toEqual(__dirname);
  });
});

describe(aFunction(createFile), () => {
  const FILE_NAME = `${TEST_DIR_ROOT}/CreatedFile.json` as const;

  afterEach(() => {
    if (doesExist(FILE_NAME)) fs.rmSync(FILE_NAME);
  });

  it('creates a file at the given path', async () => {
    const before = doesExist(FILE_NAME);

    await createFile(FILE_NAME);

    const after = doesExist(FILE_NAME);

    expect(before).toEqual(false);
    expect(after).toEqual(true);
  });
});

describe(aFunction(deleteFile), () => {
  const FILE_PATH = `${TEST_DIR_ROOT}/FileToBeDeleted.txt` as const;

  beforeEach(() => {
    if (!doesExist(FILE_PATH)) fs.writeFileSync(FILE_PATH, 'This is my content.');
  });

  it('deletes a given file if existing', async () => {
    const before = doesExist(FILE_PATH);

    await deleteFile(FILE_PATH);

    const after = doesExist(FILE_PATH);

    expect(before).toEqual(true);
    expect(after).toEqual(false);
  });
});

describe(aFunction(isFile), () => {
  const NON_EXISTING_FILE = 'NonExisting.ts';

  it('returns true if given path leads to a file', () => {
    const result = isFile(THIS_FILE);

    expect(result).toEqual(true);
  });

  it('returns false if given path leads to a non existing file', () => {
    const result = isFile(`${__dirname}/${NON_EXISTING_FILE}`);

    expect(result).toEqual(false);
  });
});

