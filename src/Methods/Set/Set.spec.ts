import { aFactory } from '@paul7peterson/typescript-toolbox';
import { $Set } from './Set';

describe(aFactory($Set), () => {
  it('Should add an entry to the set', () => {
    const set = $Set<string>();

    expect(set.size).toEqual(0);
    expect(set.add('A').size).toEqual(1);
  });

  it('Should delete an entry from the set', () => {
    const set = $Set<string>().add('A').add('B');

    expect(set.size).toEqual(2);

    const newSet = set.delete('A');

    expect(newSet.size).toEqual(1);
    expect(newSet.toArray().value).toEqual(['B']);
  });

  it('Should clear the set', () => {
    const set = $Set<string>().add('A').add('B').add('C');

    expect(set.size).toEqual(3);

    const newSet = set.clear();

    expect(newSet.size).toEqual(0);
  });

  it('Should loop with foreach' + ' through the set', () => {
    const set = $Set<string>().add('A').add('B').add('C');

    expect(set.size).toEqual(3);

    set.forEach((entry) => {
      expect(['A', 'B', 'C'].includes(entry)).toBe(true);
    });
  });
});


