import { aFunction } from '@paul7peterson/typescript-toolbox';
import { arrayToSet, setToArray } from './Set.helpers';

describe(aFunction(setToArray), () => {
  it('Returns an array containing the set entries', () => {
    const set = new Set<string>()
      .add('A')
      .add('B')
      .add('C')
      .add('D')
      .add('E');

    expect(setToArray(set)).toEqual(['A', 'B', 'C', 'D', 'E']);
  });
});

describe(aFunction(arrayToSet), () => {
  it('Returns a set containing the array entries', () => {
    const array = ['A', 'B', 'C', 'D', 'E'];
    const expectedSet = new Set<string>()
      .add('A')
      .add('B')
      .add('C')
      .add('D')
      .add('E');

    expect(arrayToSet(array)).toEqual(expectedSet);
  });
});
