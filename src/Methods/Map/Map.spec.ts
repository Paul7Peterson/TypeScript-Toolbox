

import { aFactory, aFactoryMethod } from '@paul7peterson/typescript-toolbox';
import { $Map } from './Map';

describe(aFactory($Map), () => {

  describe(aFactoryMethod($Map, 'ifHasKey'), () => {

    it('recognizes valid and invalid keys', async () => {
      const validKeys = ['KEY_A', 'KEY_B'];
      const invalidKeys = ['KEY_C', 'KEY_D'];

      const allKeys = validKeys.concat(invalidKeys);

      const map = new Map<string, string>();
      map.set('KEY_A', 'VALUE_A');
      map.set('KEY_B', 'VALUE_B');

      allKeys.forEach((key) => {
        $Map(map).ifHasKey(key)
          .thenDo(() => {
            expect(validKeys.includes(key)).toBe(true);
            expect(invalidKeys.includes(key)).toBe(false);
          })
          .elseDo(() => {
            expect(validKeys.includes(key)).toBe(false);
            expect(invalidKeys.includes(key)).toBe(true);
          });
      });
    });

    it('orSet', async () => {
      // arrange
      const validKeys = ['KEY_A', 'KEY_B'];
      const invalidKeys = ['KEY_C', 'KEY_D'];
      const allKeys = validKeys.concat(invalidKeys);

      const map = new Map<string, string>();
      map.set('KEY_A', 'VALUE_A');
      map.set('KEY_B', 'VALUE_B');

      // act
      const newMap = $Map(map);
      allKeys.forEach((key) => {
        newMap.ifHasKey(key)
          .thenDo(() => {
            expect(validKeys.includes(key)).toBe(true);
            expect(invalidKeys.includes(key)).toBe(false);
          })
          .orSet('New_Value');
      });

      // assert
      expect(newMap.toKeys().value).toEqual(allKeys);
      expect(newMap.toValues().value).toEqual(['VALUE_A', 'VALUE_B', 'New_Value', 'New_Value']);
    });
  });

  describe(aFactoryMethod($Map, 'set'), () => {
    it('new entry in map is set', async () => {
      const map = new Map<string, string>();
      map.set('KEY_A', 'VALUE_A');
      map.set('KEY_B', 'VALUE_B');

      // before
      expect(map.size).toEqual(2);

      const modifiedMap = $Map(map).set('KEY_C', 'VALUE_C');

      // after
      expect(map.size).toEqual(2);
      expect(modifiedMap.size).toEqual(3);
      expect(modifiedMap.get('KEY_A')).toBe('VALUE_A');
      expect(modifiedMap.get('KEY_B')).toBe('VALUE_B');
      expect(modifiedMap.get('KEY_C')).toBe('VALUE_C');
    });

    it('existing value is overwritten', async () => {
      const map = new Map<string, string>();
      map.set('KEY_A', 'VALUE_A');
      map.set('KEY_B', 'VALUE_B');

      // before
      expect(map.size).toEqual(2);

      const modifiedMap = $Map(map).set('KEY_B', 'new VALUE_B');

      // after
      expect(map.size).toEqual(2);
      expect(modifiedMap.size).toEqual(2);
      expect(modifiedMap.get('KEY_A')).toBe('VALUE_A');
      expect(modifiedMap.get('KEY_B')).toBe('new VALUE_B');
    });
  });

  describe(aFactoryMethod($Map, 'get'), () => {
    it('value is get by key', async () => {
      const map = new Map<string, string>();
      map.set('KEY_A', 'VALUE_A');
      map.set('KEY_B', 'VALUE_B');
      map.set('KEY_C', 'VALUE_C');

      expect($Map(map).get('KEY_A')).toEqual('VALUE_A');
      expect($Map(map).get('KEY_B')).toEqual('VALUE_B');
      expect($Map(map).get('KEY_C')).toEqual('VALUE_C');
    });
  });

  describe(aFactoryMethod($Map, 'clear'), () => {
    it('all entries are removed', async () => {
      const map = new Map<string, string>();
      map.set('KEY_A', 'VALUE_A');
      map.set('KEY_B', 'VALUE_B');
      map.set('KEY_C', 'VALUE_C');

      // before
      expect(map.size).toEqual(3);

      const modifiedMap = $Map(map).clear();

      // after
      expect(map.size).toEqual(3);
      expect(modifiedMap.size).toEqual(0);
    });
  });

  describe(aFactoryMethod($Map, 'delete'), () => {
    it('existing key is deleted', async () => {
      const map = new Map<string, string>();
      map.set('KEY_A', 'VALUE_A');
      map.set('KEY_B', 'VALUE_B');
      map.set('KEY_C', 'VALUE_C');

      // before valid deletion
      expect(map.size).toEqual(3);
      expect(map.get('KEY_B')).toEqual('VALUE_B');

      const modifiedMap = $Map(map).delete('KEY_B');

      // after valid deletion
      expect(map.size).toEqual(3);
      expect(map.get('KEY_B')).toEqual('VALUE_B');
      expect(modifiedMap.size).toEqual(2);
      expect(modifiedMap.has('KEY_B')).toBe(false);
    });

    it('not existing key is not deleted', async () => {
      const map = new Map<string, string>();
      map.set('KEY_A', 'VALUE_A');
      map.set('KEY_B', 'VALUE_B');
      map.set('KEY_C', 'VALUE_C');

      // before valid deletion
      expect(map.size).toEqual(3);

      const modifiedMap = $Map(map).delete('KEY_D');

      // after valid deletion
      expect(map.size).toEqual(3);
      expect(map.get('KEY_B')).toEqual('VALUE_B');
      expect(modifiedMap.size).toEqual(3);
    });
  });

  describe(aFactoryMethod($Map, 'has'), () => {
    // Arrange
    const map = new Map<string, string>();
    map.set('KEY_A', 'VALUE_A');
    map.set('KEY_B', 'VALUE_B');
    map.set('KEY_C', 'VALUE_C');

    it('true is returned for an existing key', async () => {
      // Act + Assert
      expect($Map(map).has('KEY_B')).toBe(true);
    });
    it('false is returned for a not existing key', async () => {
      // Act + Assert
      expect($Map(map).has('KEY_D')).toBe(false);
    });
  });

  describe(aFactoryMethod($Map, 'getOrSet'), () => {
    // Arrange
    const existingEntry = { key: 'KEY_A', value: 'VALUE_A' };
    const newEntry = { key: 'KEY_E', value: 'VALUE_E' };
    const map = new Map<string, string>();
    map.set('KEY_A', 'VALUE_A');
    map.set('KEY_B', 'VALUE_B');
    map.set('KEY_C', 'VALUE_C');

    it('value is returned for an existing key', async () => {
      // Act + Assert
      const MapAPI = $Map(map);
      expect(MapAPI.getOrSet(existingEntry.key, () => existingEntry.value)).toBe(existingEntry.value);
      expect(MapAPI.size).toEqual(3);
    });
    it('key value pair is added to map and returned for a not existing key', async () => {
      // Act + Assert
      const MapAPI = $Map(map);
      expect(MapAPI.getOrSet(newEntry.key, () => newEntry.value)).toBe(newEntry.value);
      expect(MapAPI.size).toEqual(4);
    });
  });

  describe(aFactoryMethod($Map, 'getOrSetAsync'), () => {
    // Arrange
    // const existingEntry = { key: 'KEY_A', value: 'VALUE_A' };
    // const newEntry = { key: 'KEY_E', value: 'VALUE_E' };
    const _map = new Map<string, string>()
      .set('KEY_A', 'VALUE_A')
      .set('KEY_B', 'VALUE_B')
      .set('KEY_C', 'VALUE_C');

    it.skip('value is returned for an existing key', async () => {
      // Act + Assert
    });
    it.skip('key value pair is added to map and returned for a not existing key', async () => {
      // Act + Assert
    });
  });

  describe(aFactoryMethod($Map, 'merge'), () => {
    // Arrange
    const mapA = new Map<string, string>();
    mapA.set('KEY_A', 'VALUE_A');
    mapA.set('KEY_B', 'VALUE_B');
    mapA.set('KEY_C', 'VALUE_C');

    it('two distinct maps are merged', async () => {
      // Rearrange
      const mapB = new Map<string, string>();
      mapB.set('KEY_D', 'VALUE_D');
      mapB.set('KEY_E', 'VALUE_E');

      // Act
      const mergedMap = $Map(mapA).merge(mapB);

      // Assert
      expect(mapA.size).toEqual(3);
      expect(mapB.size).toEqual(2);
      expect(mergedMap.size).toEqual(5);
      expect(mergedMap.get('KEY_A')).toEqual('VALUE_A');
      expect(mergedMap.get('KEY_B')).toEqual('VALUE_B');
      expect(mergedMap.get('KEY_C')).toEqual('VALUE_C');
      expect(mergedMap.get('KEY_D')).toEqual('VALUE_D');
      expect(mergedMap.get('KEY_E')).toEqual('VALUE_E');
    });

    it('merging two indistinct maps throws an error', async () => {
      // Rearrange
      const mapB = new Map<string, string>();
      mapB.set('KEY_C', 'VALUE_C');
      mapB.set('KEY_D', 'VALUE_D');
      mapB.set('KEY_E', 'VALUE_E');

      // Act + Assert
      expect(() => { $Map(mapA).merge(mapB); }).toThrow('The map has already the value "VALUE_C" for the key "KEY_C"');
    });
  });

  describe(aFactoryMethod($Map, 'returnAMergeWith'), () => {
    // Arrange
    const mapA = new Map<string, string[]>();
    mapA.set('KEY_A', ['VALUE_A_FIRST', 'VALUE_A_SECOND']);
    mapA.set('KEY_B', ['VALUE_B']);
    mapA.set('KEY_C', ['VALUE_C']);

    it('two distinct maps of arrays are merged', async () => {
      // Rearrange
      const mapB = new Map<string, string[]>();
      mapB.set('KEY_D', ['VALUE_D']);
      mapB.set('KEY_E', ['VALUE_E_FIRST', 'VALUE_E_SECOND']);

      // Act
      const mergedMap = $Map(mapA).returnAMergeWith(mapB);

      // Assert
      expect(mapA.size).toEqual(3);
      expect(mapB.size).toEqual(2);
      expect(mergedMap.size).toEqual(5);
      expect(mergedMap.get('KEY_A')).toEqual(['VALUE_A_FIRST', 'VALUE_A_SECOND']);
      expect(mergedMap.get('KEY_B')).toEqual(['VALUE_B']);
      expect(mergedMap.get('KEY_C')).toEqual(['VALUE_C']);
      expect(mergedMap.get('KEY_D')).toEqual(['VALUE_D']);
      expect(mergedMap.get('KEY_E')).toEqual(['VALUE_E_FIRST', 'VALUE_E_SECOND']);
    });

    it('two indistinct maps of arrays are merged. Values will be overwritten', async () => {
      // Rearrange
      const mapB = new Map<string, string[]>();
      mapB.set('KEY_C', ['VALUE_C_REPLACED']);
      mapB.set('KEY_D', ['VALUE_D']);
      mapB.set('KEY_E', ['VALUE_E_FIRST', 'VALUE_E_SECOND']);

      // Act
      const mergedMap = $Map(mapA).returnAMergeWith(mapB, 'override');

      // Assert
      expect(mapA.size).toEqual(3);
      expect(mapB.size).toEqual(3);
      expect(mergedMap.size).toEqual(5);
      expect(mergedMap.get('KEY_A')).toEqual(['VALUE_A_FIRST', 'VALUE_A_SECOND']);
      expect(mergedMap.get('KEY_B')).toEqual(['VALUE_B']);
      expect(mergedMap.get('KEY_C')).toEqual(['VALUE_C_REPLACED']);
      expect(mergedMap.get('KEY_D')).toEqual(['VALUE_D']);
      expect(mergedMap.get('KEY_E')).toEqual(['VALUE_E_FIRST', 'VALUE_E_SECOND']);
    });

    it('Trying to merge two indistinct maps of arrays throws an error', async () => {
      // Rearrange
      const mapB = new Map<string, string[]>();
      mapB.set('KEY_C', ['VALUE_C_NEW_VALUE']);
      mapB.set('KEY_D', ['VALUE_D']);
      mapB.set('KEY_E', ['VALUE_E_FIRST', 'VALUE_E_SECOND']);

      // Act + Assert
      expect(() => { $Map(mapA).returnAMergeWith(mapB); }).toThrow('The map has already the value "VALUE_C" for the key "KEY_C"');
    });
  });

  describe(aFactoryMethod($Map, 'setInMapIfNotExists'), () => {
    // Arrange
    const map = new Map<string, string>();
    map.set('KEY_A', 'VALUE_A');
    map.set('KEY_B', 'VALUE_B');
    map.set('KEY_C', 'VALUE_C');

    it('new entry is set', async () => {
      // Act
      const result = $Map(map).setInMapIfNotExists('KEY_D', 'VALUE_D');

      // Assert
      expect(map.size).toEqual(3);
      expect(result.size).toEqual(4);
      expect(result.get('KEY_B')).toEqual('VALUE_B');
    });

    it('trying to set an entry by an already existing key throws an error', async () => {
      // Act + Assert
      expect(() => { $Map(map).setInMapIfNotExists('KEY_B', 'VALUE_B'); }).toThrow('The map has already the value "VALUE_B" for the key "KEY_B"');
    });
  });

  describe(aFactoryMethod($Map, 'setItemsFromArray'), () => {
    it('items are set', async () => {
      // Arrange
      const map = new Map<string, string>();
      map.set('KEY_A', 'VALUE_A');
      map.set('KEY_B', 'VALUE_B');
      map.set('KEY_C', 'VALUE_C');

      const array = ['KEY_D', 'KEY_E', 'KEY_F'];

      // Act
      const modifiedMap = $Map(map).setItemsFromArray(array, (entry) => [entry, 'VALUE_X']);

      // Assert
      expect(map.size).toEqual(3);
      expect(modifiedMap.size).toEqual(6);
      expect(modifiedMap.get('KEY_D')).toEqual('VALUE_X');
      expect(modifiedMap.get('KEY_E')).toEqual('VALUE_X');
      expect(modifiedMap.get('KEY_F')).toEqual('VALUE_X');
    });
  });

  describe(aFactoryMethod($Map, 'setValuesFromArray'), () => {
    it('values are set', async () => {
      // Arrange
      type ObjType = { id: number, value: string; };

      const map = new Map<ObjType['id'], ObjType>();

      map.set(1, { id: 1, value: 'VALUE_A' });
      map.set(2, { id: 2, value: 'VALUE_B' });
      map.set(3, { id: 3, value: 'VALUE_C' });

      const array = [
        { id: 4, value: 'VALUE_D' },
        { id: 5, value: 'VALUE_E' },
      ];

      // Act
      const modifiedMap = $Map(map).setValuesFromArray(array, ({ id }) => id);

      // Assert
      expect(map.size).toEqual(3);
      expect(modifiedMap.size).toEqual(5);
      expect(modifiedMap.get(4)?.value).toBe('VALUE_D');
      expect(modifiedMap.get(5)?.value).toBe('VALUE_E');
    });
  });

  describe(aFactoryMethod($Map, 'toEntries'), () => {
    it('the entries are returned', async () => {
      // Arrange
      const map = new Map<string, string>();
      map.set('KEY_A', 'VALUE_A');
      map.set('KEY_B', 'VALUE_B');
      map.set('KEY_C', 'VALUE_C');

      // Act
      const entries = $Map(map).toEntries();

      // Assert
      expect(map.size).toEqual(3);
      expect(entries).toHaveLength(3);
      expect(entries.value).toEqual([['KEY_A', 'VALUE_A'], ['KEY_B', 'VALUE_B'], ['KEY_C', 'VALUE_C']]);
    });
  });

  describe(aFactoryMethod($Map, 'toKeys'), () => {
    it('the keys are returned', async () => {
      // Arrange
      const map = new Map<string, string>();
      map.set('KEY_A', 'VALUE_A');
      map.set('KEY_B', 'VALUE_B');
      map.set('KEY_C', 'VALUE_C');

      // Act
      const keys = $Map(map).toKeys();

      // Assert
      expect(map.size).toEqual(3);
      expect(keys).toHaveLength(3);
      expect(keys.value).toEqual(['KEY_A', 'KEY_B', 'KEY_C']);
    });
  });

  describe(aFactoryMethod($Map, 'toSet'), () => {
    it('the Map is returned as a Set', async () => {
      // Arrange
      const map = new Map<string, string>();
      map.set('KEY_A', 'VALUE_A');
      map.set('KEY_B', 'VALUE_B');
      map.set('KEY_C', 'VALUE_C');

      // Act
      const set = $Map(map).toSet();

      // Assert
      expect(set.size).toBe(3);
      expect(set.value.has('VALUE_A')).toBe(true);
      expect(set.value.has('VALUE_B')).toBe(true);
      expect(set.value.has('VALUE_C')).toBe(true);
    });
  });

  describe(aFactoryMethod($Map, 'toValues'), () => {
    it('the values are returned', async () => {
      // Arrange
      const map = new Map<string, string>();
      map.set('KEY_A', 'VALUE_A');
      map.set('KEY_B', 'VALUE_B');
      map.set('KEY_C', 'VALUE_C');

      // Act
      const values = $Map(map).toValues();

      // Assert
      expect(map.size).toEqual(3);
      expect(values).toHaveLength(3);
      expect(values.value).toEqual(['VALUE_A', 'VALUE_B', 'VALUE_C']);
    });
  });
});
