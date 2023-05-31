import { aFactory, aFactoryMethod } from '@paul7peterson/typescript-toolbox';
import { $Object } from './Object';

const TEST_OBJECT = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3',
  key4: 'value4',
} as const;

describe(aFactory($Object), () => {

  describe(aFactoryMethod($Object, 'toKeys'), () => {

    it('the object keys are returned', () => {
      const obj = {
        key1: 'value1',
        key2: 1,
        key3: {},
        key4: true,
      };
      const result = $Object(obj).toKeys().value;

      expect(result).toEqual(['key1', 'key2', 'key3', 'key4']);
    });
  });

  describe(aFactoryMethod($Object, 'toValues'), () => {
    it('the object values are returned', () => {
      const result = $Object(TEST_OBJECT).toValues().value;

      expect(result).toEqual(['value1', 'value2', 'value3', 'value4']);
    });
  });


  describe(aFactoryMethod($Object, 'toEntries'), () => {
    it('the object entries are returned as array', () => {
      const result = $Object(TEST_OBJECT).toEntries().value;

      expect(result).toEqual([
        ['key1', 'value1'],
        ['key2', 'value2'],
        ['key3', 'value3'],
        ['key4', 'value4'],
      ]);
    });
  });



  describe(aFactoryMethod($Object, 'toMap'), () => {
    it('the object entries are returned as map', () => {
      const result = $Object(TEST_OBJECT).toMap().value;

      expect(result.get('key1')).toEqual('value1');
      expect(result.get('key2')).toEqual('value2');
      expect(result.get('key3')).toEqual('value3');
      expect(result.get('key4')).toEqual('value4');
    });
  });
});


