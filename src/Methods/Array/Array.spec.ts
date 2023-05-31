import { yellowBright } from 'chalk';

import { $Array } from './Array';

describe(yellowBright`${$Array.name}.sortNumerically()`, () => {

  it('sorts the numbers in ascending order', () => {
    const input: number[] = [2, 5, 8, -1, 0, 5.5];
    $Array(input).sort();

    expect(input).toMatchObject([-1, 0, 2, 5, 5.5, 8]);
  });

  it('sorts the numbers in ascending order', () => {
    const input: number[] = [2, 5, 8, -1, 0, 5.5];
    $Array(input).sort('descending');

    expect(input).toMatchObject([8, 5.5, 5, 2, 0, -1]);
  });
});

describe(yellowBright`${$Array.name}.removeDuplicates()`, () => {

  it('removes duplicated numbers', () => {
    const input: number[] = [2, 5, 5, 8, 3.3, 3.3];
    const result = $Array(input).getUniqueValues();

    expect(result.value).toMatchObject([2, 5, 8, 3.3]);
  });

  it('removes duplicated strings', () => {
    const input: string[] = ['a', 'b', 'b', 'test', 'test'];
    const result = $Array(input).getUniqueValues();

    expect(result.value).toMatchObject(['a', 'b', 'test']);
  });
});

//

describe(yellowBright`${$Array.name}.sortAlphabetically()`, () => {

  it('passes', () => {
    expect(true).toBe(true);
  });
});

//

describe(yellowBright`${$Array.name}.sortObjectsNumerically()`, () => {

  it('sorts object numerically by given key', () => {
    const input: { amount: number; }[] = [
      { amount: 2 },
      { amount: 3 },
      { amount: 1 },
    ];
    $Array(input).sortNumerically('amount');

    expect(input).toMatchObject([
      { amount: 1 },
      { amount: 2 },
      { amount: 3 },
    ]);
  });

  it('sorts object numerically by given key descending', () => {
    const input: { amount: number; }[] = [
      { amount: 2 },
      { amount: 3 },
      { amount: 1 },
    ];
    $Array(input).sortNumerically('amount', 'descending');

    expect(input).toMatchObject([
      { amount: 3 },
      { amount: 2 },
      { amount: 1 },
    ]);
  });
});

//

describe(yellowBright`${$Array.name}.sortObjectsAlphabetically()`, () => {

  it('sorts object alphabetically by given key', () => {
    const input: { name: string; }[] = [
      { name: 'test' },
      { name: 'cat' },
      { name: 'a' },
    ];
    $Array(input).sortAlphabetically('name');

    expect(input).toMatchObject([
      { name: 'a' },
      { name: 'cat' },
      { name: 'test' },
    ]);
  });

  it('sorts object alphabetically by given key descending', () => {
    const input: { name: string; }[] = [
      { name: 'test' },
      { name: 'cat' },
      { name: 'a' },
    ];
    $Array(input).sortAlphabetically('name', 'descending');

    expect(input).toMatchObject([
      { name: 'test' },
      { name: 'cat' },
      { name: 'a' },
    ]);
  });
});


describe(yellowBright`${$Array.name}.doubleLoop()`, () => {
  const sample = [
    { array: ['a', 'b'], bool: true },
    { array: ['d', 'c'], bool: false },
  ];

  it('retrieves the right assets', () => {
    const add: string[] = [];

    $Array(sample).doubleLoop('array', (a) => { add.push(a); });

    const expectedResult = sample.flatMap(({ array }) => array);

    expect(add).toMatchObject(expectedResult);
  });
});

//

describe(yellowBright`${$Array.name}.tripleLoop.()`, () => {
  const sample = [
    {
      firstArray: [
        { secondArray: ['a', 'b'], bool: true },
        { secondArray: ['d', 'c'], bool: false }], bool: true,
    },
    {
      firstArray: [
        { secondArray: ['e', 'f'], bool: true },
        { secondArray: ['g', 'h'], bool: false }], bool: false,
    },
  ];

  it('retrieves the right assets', () => {
    const add: string[] = [];

    $Array(sample).tripleLoop(['firstArray', 'secondArray'], (a) => { add.push(a); });

    const expectedResult = sample.flatMap(({ firstArray }) =>
      firstArray.flatMap(({ secondArray }) => secondArray));

    expect(add).toMatchObject(expectedResult);
  });
});
