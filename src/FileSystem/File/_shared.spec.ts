
import * as fs from 'fs';
import * as path from 'path';

import { aClass, aGetter, aMethod } from '@paul7peterson/typescript-toolbox';
import { doesExist, joinPath } from '../_shared';
import { CommonFileAPI as _CommonFileAPI } from './_shared';
import { FilePath } from './FileExtensions.types';

const TEST_DIRECTORY = path.join(__dirname, '__tests__');

const FILE_CONTENT = { content: 'This is my file content' };

const CURRENT_DIRECTORY_PATH = __dirname;
const EXISTING_FILE = __filename as FilePath.Any;
const NON_EXISTING_FILE = 'NonExisting';

class CommonFileAPI<T extends FilePath.Any> extends _CommonFileAPI<T> { }

describe(aClass(CommonFileAPI), () => {

  describe('properties', () => {
    const FILE_NAME = 'PropertyFile';
    const FILE_PATH = joinPath(TEST_DIRECTORY, `${FILE_NAME}.json`);
    const FILE = new CommonFileAPI(FILE_PATH);

    beforeAll(() => {
      if (!doesExist(TEST_DIRECTORY))
        fs.mkdirSync(TEST_DIRECTORY);
    });

    beforeEach(() => {
      if (!doesExist(FILE_PATH)) fs.writeFileSync(FILE_PATH, JSON.stringify(FILE_CONTENT));
    });

    afterEach(() => {
      if (doesExist(FILE_PATH)) fs.rmSync(FILE_PATH);
    });

    describe(aGetter(CommonFileAPI, 'name'), () => {
      it('returns the name of the file', () => {
        expect(FILE.name).toEqual(`${FILE_NAME}.json`);
      });
    });

    describe(aGetter(CommonFileAPI, 'extension'), () => {
      it('returns the extension of the file', () => {
        expect(FILE.extension).toEqual('json');
      });
    });

    describe(aGetter(CommonFileAPI, 'path'), () => {
      it('returns the path of the file', () => {
        expect(FILE.path).toEqual(FILE_PATH);
      });
    });

    describe(aGetter(CommonFileAPI, 'size'), () => {
      it('returns the size of the file', () => {
        expect(FILE.size).toBeGreaterThan(0);
      });
    });

    describe(aGetter(CommonFileAPI, 'createdAt'), () => {
      it('returns the createdAt of the file', () => {
        expect(FILE.createdAt).toBeDefined();
      });
    });

    describe(aGetter(CommonFileAPI, 'lastAccess'), () => {
      it('returns the lastAccess of the file', () => {
        expect(FILE.lastAccess).toBeDefined();
      });
    });

    describe(aGetter(CommonFileAPI, 'lastModified'), () => {
      it('returns the lastModified of the file', () => {
        expect(FILE.lastModified).toBeDefined();
      });
    });

    describe(aGetter(CommonFileAPI, 'lifeSpan'), () => {
      it('returns the lifeSpan of the file', () => {
        expect(FILE.lifeSpan).toBeDefined();
      });
    });

    describe(aGetter(CommonFileAPI, 'modificationSpan'), () => {
      it('returns the modificationSpan of the file', () => {
        expect(FILE.modificationSpan).toBeDefined();
      });
    });
  });
});

describe(aMethod(CommonFileAPI, 'create'), () => {
  const FILE_PATH = joinPath(TEST_DIRECTORY, 'CreatedFile.json');

  afterEach(() => {
    if (doesExist(FILE_PATH)) fs.rmSync(FILE_PATH);
  });

  it('creates a file at the target location', async () => {
    const before = doesExist(FILE_PATH);

    await new CommonFileAPI(FILE_PATH).create();

    const after = doesExist(FILE_PATH);

    expect(before).toEqual(false);
    expect(after).toEqual(true);
  });
});

describe(aMethod(CommonFileAPI, 'delete'), () => {
  const FILE_PATH = joinPath(TEST_DIRECTORY, 'FileToBeDeleted.json');

  it('deletes an existing file at the target location', async () => {
    if (!doesExist(FILE_PATH)) fs.writeFileSync(FILE_PATH, JSON.stringify(FILE_CONTENT));

    const before = doesExist(FILE_PATH);

    await new CommonFileAPI(FILE_PATH).delete();

    const after = doesExist(FILE_PATH);

    expect(before).toEqual(true);
    expect(after).toEqual(false);
  });
});

describe(aMethod(CommonFileAPI, 'getFolderName'), () => {
  it('returns path of directory containing the given file', () => {
    const folderName = new CommonFileAPI(EXISTING_FILE).getFolderName();

    expect(folderName).toEqual(CURRENT_DIRECTORY_PATH);
  });
});

describe(aMethod(CommonFileAPI, 'doesExist'), () => {
  it('returns true if the target file is an existing file', () => {
    const file = new CommonFileAPI(EXISTING_FILE);

    expect(file.doesExist()).toEqual(true);
  });

  it('returns false if the target file is a non existing file', () => {
    const file = new CommonFileAPI(`${CURRENT_DIRECTORY_PATH}/${NON_EXISTING_FILE}.spec.ts`);

    expect(file.doesExist()).toEqual(false);
  });
});

describe(aMethod(CommonFileAPI, 'getStats'), () => {
  it('returns the stats of a given file', () => {
    const stats = new CommonFileAPI(EXISTING_FILE).getStats();

    expect(stats).toBeDefined();
    expect(stats.size).toBeDefined();
    expect(stats.birthtime).toBeDefined();
  });
});

describe(aMethod(CommonFileAPI, 'createFolderForFile'), () => {
  const FOLDER_PATH = path.join(TEST_DIRECTORY, 'createFolderForFile');
  const FILE_PATH = joinPath(FOLDER_PATH, 'NewTestFile.json');

  afterEach(() => {
    if (doesExist(FOLDER_PATH)) fs.rmSync(FOLDER_PATH, { recursive: true });
  });

  it('creates the folderPath to the given file', async () => {
    const before = doesExist(FOLDER_PATH);

    await new CommonFileAPI(`${FOLDER_PATH}/${FILE_PATH}.json`)
      .createFolderForFile();

    const after = doesExist(FOLDER_PATH);

    expect(before).toEqual(false);
    expect(after).toEqual(true);
  });
});

