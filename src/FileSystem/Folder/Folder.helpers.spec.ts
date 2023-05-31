import * as fs from 'fs';
import * as path from 'path';

import { aFunction } from '@paul7peterson/typescript-toolbox';
import { doesExist } from '../_shared/_shared.helpers';
import {
  copyFolder,
  deleteFolderContent,
  getFilePaths,
  isFolder,
  removeFilesPerExtensionFromFolder,
  splitFilePathAndName,
} from './Folder.helpers';

const TEST_DIRECTORY = path.join(__dirname, '__tests__');

const JSON_File = 'Test_file.json';
const JSON_File_2 = 'Test_file2.json';
const TXT_File = 'Test_file.txt';

const content = JSON.stringify({ content: 'test' });

describe(aFunction(deleteFolderContent), () => {
  const FOLDER_PATH = path.join(TEST_DIRECTORY, 'testFolder_deleteFolderContent');
  const FILE_PATH = path.join(FOLDER_PATH, 'Test_file.json');

  beforeEach(() => {
    if (!doesExist(FOLDER_PATH))
      fs.mkdirSync(FOLDER_PATH);

    if (!doesExist(FOLDER_PATH))
      fs.mkdirSync(FOLDER_PATH);

    fs.writeFileSync(FILE_PATH, content);
  });

  afterEach(() => {
    if (doesExist(FOLDER_PATH))
      fs.rmSync(FOLDER_PATH, { recursive: true });
  });

  it('removes an existing folder content', async () => {
    const folder_before = doesExist(FOLDER_PATH);
    const file_before = doesExist(FILE_PATH);

    await deleteFolderContent(FOLDER_PATH);

    const folder_after = doesExist(FOLDER_PATH);
    const file_after = doesExist(FILE_PATH);

    expect(folder_before).toBe(true);
    expect(file_before).toBe(true);
    expect(folder_after).toBe(true);
    expect(file_after).toBe(false);
  });

  it.skip('throws error if target is a file', () => {
  });
});

describe(aFunction(removeFilesPerExtensionFromFolder), () => {
  const FOLDER_PATH = path.join(TEST_DIRECTORY, 'testFolder_deleteFilesPerExtension');
  const JSON_FILE_PATH = path.join(FOLDER_PATH, JSON_File);
  const JSON_FILE2_PATH = path.join(FOLDER_PATH, JSON_File_2);
  const TXT_FILE_PATH = path.join(FOLDER_PATH, TXT_File);

  beforeEach(() => {
    if (!doesExist(FOLDER_PATH))
      fs.mkdirSync(FOLDER_PATH);

    fs.writeFileSync(JSON_FILE_PATH, content);
    fs.writeFileSync(JSON_FILE2_PATH, content);
    fs.writeFileSync(TXT_FILE_PATH, content);
  });

  afterEach(() => {
    if (doesExist(FOLDER_PATH))
      fs.rmSync(FOLDER_PATH, { recursive: true });
  });

  it('removes all files with given extension from folder', async () => {
    const folder_before = doesExist(FOLDER_PATH);
    const json_file_before = doesExist(JSON_FILE_PATH);
    const json_file2_before = doesExist(JSON_FILE2_PATH);
    const txt_file_before = doesExist(TXT_FILE_PATH);

    await removeFilesPerExtensionFromFolder('.json', undefined, FOLDER_PATH);

    const folder_after = doesExist(FOLDER_PATH);
    const json_file_after = doesExist(JSON_FILE_PATH);
    const json_file2_after = doesExist(JSON_FILE2_PATH);
    const txt_file_after = doesExist(TXT_FILE_PATH);

    expect(folder_before).toBe(true);
    expect(json_file_before).toBe(true);
    expect(json_file2_before).toBe(true);
    expect(txt_file_before).toBe(true);

    expect(folder_after).toBe(true);
    expect(json_file_after).toBe(false);
    expect(json_file2_after).toBe(false);
    expect(txt_file_after).toBe(true);
  });
});

describe(aFunction(getFilePaths), () => {
  const FOLDER_PATH = path.join(TEST_DIRECTORY, 'testFolder_getNamesOfAllFiles');

  beforeEach(() => {
    if (!doesExist(FOLDER_PATH))
      fs.mkdirSync(FOLDER_PATH);

    [JSON_File, JSON_File_2, TXT_File].forEach((fileName) => {
      fs.writeFileSync(path.join(FOLDER_PATH, fileName), content);
    });
  });

  afterEach(() => {
    if (doesExist(FOLDER_PATH))
      fs.rmSync(FOLDER_PATH, { recursive: true });
  });

  it('returns an array of all file paths of the given directory', () => {
    const fileNames = getFilePaths(FOLDER_PATH);

    expect(fileNames[0]).toEqual(path.join(FOLDER_PATH, JSON_File));
    expect(fileNames[1]).toEqual(path.join(FOLDER_PATH, TXT_File));
    expect(fileNames[2]).toEqual(path.join(FOLDER_PATH, JSON_File_2));
  });
});


describe(aFunction(isFolder), () => {

  it('returns true if given path is a directory', () => {
    expect(isFolder(TEST_DIRECTORY)).toEqual(true);
  });

  it('returns false if given path is a file', () => {
    expect(isFolder('./Folder.helpers.spec.ts')).toEqual(false);
  });
});

describe(aFunction(copyFolder), () => {
  const FOLDER_PATH = path.join(TEST_DIRECTORY, 'testFolder_copyFolder');
  const JSON_FILE_PATH = path.join(FOLDER_PATH, JSON_File);
  const JSON_FILE2_PATH = path.join(FOLDER_PATH, JSON_File_2);

  const INNER_FOLDER = path.join(FOLDER_PATH, 'testFolder_inner_folder');
  const INNER_FOLDER_JSON_FILE_PATH = path.join(INNER_FOLDER, JSON_File);

  beforeEach(() => {
    if (!doesExist(FOLDER_PATH))
      fs.mkdirSync(FOLDER_PATH);

    if (!doesExist(INNER_FOLDER))
      fs.mkdirSync(INNER_FOLDER);

    [JSON_FILE_PATH, JSON_FILE2_PATH].forEach((filePath) => {
      fs.writeFileSync(filePath, content);
    });

    fs.writeFileSync(INNER_FOLDER_JSON_FILE_PATH, content);
  });

  afterEach(() => {
    if (doesExist(FOLDER_PATH))
      fs.rmSync(FOLDER_PATH, { recursive: true });
  });

  it('throws error if target is not a folder', () => {
    expect(() => copyFolder(JSON_FILE_PATH, TEST_DIRECTORY)).toThrowError();
  });

  it('copies source folder to target location', () => {
    copyFolder(FOLDER_PATH, TEST_DIRECTORY);

    const DIR_PATH = FOLDER_PATH;

    expect(doesExist(DIR_PATH)).toBe(true);
    expect(doesExist(JSON_FILE_PATH)).toBe(true);
    expect(doesExist(JSON_FILE2_PATH)).toBe(true);
    expect(doesExist(INNER_FOLDER)).toBe(true);
    expect(doesExist(INNER_FOLDER_JSON_FILE_PATH)).toBe(true);
  });
});

describe(aFunction(splitFilePathAndName), () => {
  const file = path.join(TEST_DIRECTORY, 'folderTest.helpers.ts');

  it('returns an object containing the path, name and extension of the given file', () => {
    const { path, fileName, extension } = splitFilePathAndName(file);

    expect(path).toEqual(TEST_DIRECTORY);
    expect(fileName).toEqual('folderTest.helpers');
    expect(extension).toEqual('.ts');
  });
});


