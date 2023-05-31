import * as fs from 'fs';
import * as path from 'path';

import { aClass, aMethod } from '@paul7peterson/typescript-toolbox';
import { doesExist } from '../_shared/_shared.helpers';
import { $Folder } from './Folder';

const TEST_DIRECTORY = path.join(__dirname, '__tests__');

const JSON_FILE = 'Test_file.json';
const JSON_FILE2 = 'Test_file2.json';
const TXT_FILE = 'Test_file.txt';

const content = JSON.stringify({ content: 'test' });

describe(aClass($Folder), () => {

  describe(aMethod($Folder, 'create'), () => {
    const FOLDER_PATH = path.join(TEST_DIRECTORY, 'testFolder_create');

    beforeAll(() => {
      if (!doesExist(TEST_DIRECTORY))
        fs.mkdirSync(TEST_DIRECTORY);
    });

    afterEach(() => {
      if (doesExist(FOLDER_PATH))
        fs.rmSync(FOLDER_PATH, { recursive: true });
    });

    it('creates a non existing folder', async () => {

      const before = doesExist(FOLDER_PATH);

      await new $Folder(FOLDER_PATH).create();

      const after = doesExist(FOLDER_PATH);

      expect(before).toBe(false);
      expect(after).toBe(true);
    });
  });

  describe(aMethod($Folder, 'delete'), () => {
    const FOLDER_PATH = path.join(TEST_DIRECTORY, 'testFolder_delete');

    beforeEach(() => {
      if (!doesExist(FOLDER_PATH))
        fs.mkdirSync(FOLDER_PATH);
    });

    it('deletes an existing folder', async () => {

      const before = doesExist(FOLDER_PATH);

      await new $Folder(FOLDER_PATH).delete();

      const after = doesExist(FOLDER_PATH);

      expect(before).toBe(true);
      expect(after).toBe(false);
    });
  });

  describe(aMethod($Folder, 'deleteContent'), () => {
    const FOLDER_PATH = path.join(TEST_DIRECTORY, 'testFolder_deleteFolderContent');
    const FILE_NAME = 'Test_file.json';
    const FILE_PATH = path.join(FOLDER_PATH, FILE_NAME);

    beforeEach(() => {
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

      await new $Folder(FOLDER_PATH).deleteContent();

      const folder_after = doesExist(FOLDER_PATH);
      const file_after = doesExist(FILE_PATH);

      expect(folder_before).toBe(true);
      expect(file_before).toBe(true);

      expect(folder_after).toBe(true);
      expect(file_after).toBe(false);
    });
  });

  describe(aMethod($Folder, 'removeFilesPerExtension'), () => {
    const FOLDER_PATH = path.join(TEST_DIRECTORY, 'testFolder_deleteFilesPerExtension');
    const JSON_FILE_PATH = path.join(FOLDER_PATH, JSON_FILE);
    const JSON_FILE2_PATH = path.join(FOLDER_PATH, JSON_FILE2);
    const TXT_FILE_PATH = path.join(FOLDER_PATH, TXT_FILE);

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

      await new $Folder(FOLDER_PATH).removeFilesPerExtension('.json', undefined);

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

  describe(aMethod($Folder, 'doesExist'), () => {

    it('returns true if given path leads to a folder', () => {
      expect(new $Folder(TEST_DIRECTORY).doesExist()).toEqual(true);
    });

    it('returns false if given path leads to a file', () => {
      expect(new $Folder('./Folder.spec.ts').doesExist()).toEqual(false);
    });
  });


  describe(aMethod($Folder, 'getStats'), () => {

    it('returns object with folder stats', () => {
      const stats = new $Folder(TEST_DIRECTORY).getStats();

      expect(stats.isDirectory()).toBe(true);
      expect(stats.isFile()).toBe(false);
    });

    it('throws error if used on file', () => {
      expect(() => new $Folder('./Folder.spec.ts').getStats()).toThrowError();
    });
  });

  describe(aMethod($Folder, 'listFiles'), () => {
    const FOLDER_PATH = path.join(TEST_DIRECTORY, 'testFolder_getAllFilePaths');
    const JSON_FILE_PATH = path.join(FOLDER_PATH, JSON_FILE);
    const JSON_FILE2_PATH = path.join(FOLDER_PATH, JSON_FILE2);
    const TXT_FILE_PATH = path.join(FOLDER_PATH, TXT_FILE);

    beforeEach(() => {
      if (!doesExist(FOLDER_PATH))
        fs.mkdirSync(FOLDER_PATH);

      fs.writeFileSync(JSON_FILE_PATH, content);
      fs.writeFileSync(JSON_FILE2_PATH, content);
      fs.writeFileSync(TXT_FILE_PATH, content);
    });

    afterEach(() => {
      if (doesExist(FOLDER_PATH)) fs.rmSync(FOLDER_PATH, { recursive: true });
    });

    it('returns an array of all file paths of the given directory', () => {
      const fileNames = new $Folder(FOLDER_PATH).listFiles();

      expect(fileNames[0]).toEqual(JSON_FILE_PATH);
      expect(fileNames[1]).toEqual(TXT_FILE_PATH);
      expect(fileNames[2]).toEqual(JSON_FILE2_PATH);
    });
  });
});


