

import { aFunction } from '@paul7peterson/typescript-toolbox';
import {
  fromMapOfSetsToMapsOfArrays,
  mapEntriesToArray,
  mapFromArray,
  mapFromArrayWithValues,
  mapKeysToArray,
  mapOfArraysFromArray,
  mapToObject,
  mapValuesToArray,
  mergeMaps,
  mergeMapsOfArrays,
  putArrayInMap,
  putArrayItemsInMap,
  returnAMergeWith,
  setInMapIfNotExists,
} from './Map.helpers';

describe(aFunction(mapToObject), () => {
  it('should convert a map into an object', () => {
    const map = new Map<string, string>()
      .set('key_A', 'value_A')
      .set('key_B', 'value_B')
      .set('key_C', 'value_C');

    const obj = mapToObject(map);

    expect(map.size).toEqual(3);
    expect(obj['key_A']).toEqual('value_A');
    expect(obj['key_B']).toEqual('value_B');
    expect(obj['key_C']).toEqual('value_C');
    expect(obj).toEqual({ key_A: 'value_A', key_B: 'value_B', key_C: 'value_C' });
  });

  it('stringify' + ' map', () => {
    const map = new Map<string, string>()
      .set('KEY_A', 'VALUE_A')
      .set('KEY_B', 'VALUE_B')
      .set('KEY_C', 'VALUE_C');

    const jsonString = JSON.stringify(mapToObject(map));

    expect(jsonString).toEqual('{"KEY_A":"VALUE_A","KEY_B":"VALUE_B","KEY_C":"VALUE_C"}');
  });
});

describe(aFunction(fromMapOfSetsToMapsOfArrays), () => {

  it('should convert a map of sets into a map of arrays', () => {
    const setA = new Set<string>(['A1', 'A2', 'A3']);
    const setB = new Set<string>(['B1', 'B2', 'B3']);
    const setC = new Set<string>(['C1', 'C2', 'C3']);

    const setMap = new Map<string, Set<string>>()
      .set('key_A', setA)
      .set('key_B', setB)
      .set('key_C', setC);

    const arrayMap = fromMapOfSetsToMapsOfArrays(setMap);

    expect(arrayMap.get('key_A')).toEqual(['A1', 'A2', 'A3']);
    expect(arrayMap.get('key_B')).toEqual(['B1', 'B2', 'B3']);
    expect(arrayMap.get('key_C')).toEqual(['C1', 'C2', 'C3']);
  });
});

describe(aFunction(mapEntriesToArray), () => {

  it('should create an array of the maps entries', () => {
    const map = new Map<string, string>();
    map.set('key_A', 'value_A').set('key_B', 'value_B').set('key_C', 'value_C');

    const array = mapEntriesToArray(map);
    expect(array).toHaveLength(3);
    expect(array).toEqual([['key_A', 'value_A'], ['key_B', 'value_B'], ['key_C', 'value_C']]);
  });
});

describe(aFunction(mapFromArray), () => {

  it('should create a map from an array', () => {
    const array = [
      { id: 1, name: 'Joe Doe' },
      { id: 2, name: 'John Doe' },
      { id: 3, name: 'Jean Doe' },
      { id: 4, name: 'Max Mustermann' },
    ];

    const map = mapFromArray(array, ({ id }) => id);

    expect(array).toHaveLength(4);
    expect(map.size).toEqual(4);
    expect(map.get(1)).toEqual({ id: 1, name: 'Joe Doe' });
    expect(map.get(2)).toEqual({ id: 2, name: 'John Doe' });
    expect(map.get(3)).toEqual({ id: 3, name: 'Jean Doe' });
    expect(map.get(4)).toEqual({ id: 4, name: 'Max Mustermann' });
  });
});

describe(aFunction(mapFromArrayWithValues), () => {

  it.skip('passes', () => {
    expect(true).toBe(true);
  });
});

describe(aFunction(mapKeysToArray), () => {

  it('should create an array of the map keys', () => {
    const map = new Map<string, string>()
      .set('key_A', 'value_A')
      .set('key_B', 'value_B')
      .set('key_C', 'value_C');

    const array = mapKeysToArray(map);

    expect(array).toHaveLength(3);
    expect(array).toEqual(['key_A', 'key_B', 'key_C']);
  });
});

describe(aFunction(mapOfArraysFromArray), () => {

  it.skip('should create a map of arrays from an array', () => {
    expect(true).toBe(true);
  });
});

describe(aFunction(mapValuesToArray), () => {

  it('should create an array of the map values', () => {
    const map = new Map<string, string>();
    map.set('key_A', 'value_A').set('key_B', 'value_B').set('key_C', 'value_C');

    const array = mapValuesToArray(map);

    expect(map.size).toEqual(3);
    expect(array).toHaveLength(3);
    expect(array).toEqual(['value_A', 'value_B', 'value_C']);
  });
});

describe(aFunction(mergeMaps), () => {

  it('merge distinct maps', () => {
    const mapA = new Map<string, string>();
    mapA.set('KEY_A', 'VALUE_A');
    mapA.set('KEY_B', 'VALUE_B');
    mapA.set('KEY_C', 'VALUE_C');

    const mapB = new Map<string, string>();
    mapB.set('KEY_D', 'VALUE_D');
    mapB.set('KEY_E', 'VALUE_E');

    const mergedMap = mergeMaps(mapA, mapB);

    expect(mapA.size).toEqual(3);
    expect(mapB.size).toEqual(2);
    expect(mergedMap.size).toEqual(5);
    expect(mergedMap.get('KEY_A')).toEqual('VALUE_A');
    expect(mergedMap.get('KEY_B')).toEqual('VALUE_B');
    expect(mergedMap.get('KEY_C')).toEqual('VALUE_C');
    expect(mergedMap.get('KEY_D')).toEqual('VALUE_D');
    expect(mergedMap.get('KEY_E')).toEqual('VALUE_E');
  });

  it('merge two indistinct maps', () => {
    const mapA = new Map<string, string>();
    mapA.set('KEY_A', 'VALUE_A');
    mapA.set('KEY_B', 'VALUE_B');
    mapA.set('KEY_C', 'VALUE_C');

    const mapB = new Map<string, string>();
    mapB.set('KEY_C', 'VALUE_C');
    mapB.set('KEY_D', 'VALUE_D');
    mapB.set('KEY_E', 'VALUE_E');

    expect(() => { mergeMaps(mapA, mapB); }).toThrow('The map has already the value "VALUE_C" for the key "KEY_C"');
  });

});

describe(aFunction(mergeMapsOfArrays), () => {

  it('should merge two maps of arrays', () => {
    const mapA = new Map<string, string[]>()
      .set('key_A', ['A1', 'A2', 'A3'])
      .set('key_B', ['B1', 'B2', 'B3'])
      .set('key_C', ['C1', 'C2', 'C3']);

    const mapB = new Map<string, string[]>()
      .set('key_D', ['D1', 'D2', 'D3'])
      .set('key_E', ['E1', 'E2', 'E3'])
      .set('key_F', ['F1', 'F2', 'F3']);

    const mergedMap = mergeMapsOfArrays(mapA, mapB);

    expect(mapA.size).toEqual(3);
    expect(mapB.size).toEqual(3);
    expect(mergedMap.size).toEqual(6);
    expect(mergedMap.get('key_A')).toEqual(['A1', 'A2', 'A3']);
    expect(mergedMap.get('key_B')).toEqual(['B1', 'B2', 'B3']);
    expect(mergedMap.get('key_C')).toEqual(['C1', 'C2', 'C3']);
    expect(mergedMap.get('key_D')).toEqual(['D1', 'D2', 'D3']);
    expect(mergedMap.get('key_E')).toEqual(['E1', 'E2', 'E3']);
    expect(mergedMap.get('key_F')).toEqual(['F1', 'F2', 'F3']);
  });
});

describe(aFunction(putArrayInMap), () => {

  it.skip('should add an array to a map', () => {
  });
});

describe(aFunction(mapValuesToArray), () => {

  it.skip('passes', () => {
    expect(true).toBe(true);
  });
});

describe(aFunction(putArrayItemsInMap), () => {

  it.skip('passes', () => {
    expect(true).toBe(true);
  });
});

describe(aFunction(returnAMergeWith), () => {

  it.skip('passes', () => {
    expect(true).toBe(true);
  });
});

describe(aFunction(setInMapIfNotExists), () => {

  it.skip('passes', () => {
    expect(true).toBe(true);
  });
});
