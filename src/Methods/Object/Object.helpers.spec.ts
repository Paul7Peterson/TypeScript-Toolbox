import { aFunction } from '@paul7peterson/typescript-toolbox';
import { objectEntries, objectKeys, objectToMap, objectValues } from './Object.helpers';

const TEST_OBJ = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3',
  key4: 'value4',
} as const;

describe(aFunction(objectKeys), () => {

  it('returns object keys', () => {
    const obj = {
      key1: 'value1',
      key2: 1,
      key3: {},
      key4: true,
    };

    const result = objectKeys(obj);

    expect(result).toEqual(['key1', 'key2', 'key3', 'key4']);
  });
});

describe(aFunction(objectValues), () => {
  it('returns object values', () => {

    const result = objectValues(TEST_OBJ);
    expect(result).toEqual(['value1', 'value2', 'value3', 'value4']);
  });
});

describe(aFunction(objectEntries), () => {
  it('returns object entries as array', () => {
    const result = objectEntries(TEST_OBJ);

    expect(result).toEqual([
      ['key1', 'value1'],
      ['key2', 'value2'],
      ['key3', 'value3'],
      ['key4', 'value4'],
    ]);
  });
});

describe(aFunction(objectToMap), () => {
  it('returns object entries as map', () => {
    const result = objectToMap(TEST_OBJ);

    expect(result.get('key1')).toEqual('value1');
    expect(result.get('key2')).toEqual('value2');
    expect(result.get('key3')).toEqual('value3');
    expect(result.get('key4')).toEqual('value4');
  });
});
