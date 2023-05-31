import { aClass } from '@paul7peterson/typescript-toolbox';
import { ArrayWrapper, IteratorPattern } from './_shared';

class ArrayWrapper_Test<T> extends ArrayWrapper<T> { }

describe(aClass(ArrayWrapper_Test), () => {

  const data = ['a', 'b', 'c'];
  const capacity = data.length;
  let classObject;

  beforeAll(() => {
    classObject = new ArrayWrapper_Test({ data, capacity, defaultCapacity: 100 });
  });

  it('Capacity should be set correctly.', () => {
    expect(classObject.capacity).toEqual(capacity);
  });

  it('Last should return last item of data array.', () => {
    expect(classObject.last).toEqual(data[data.length - 1]);
  });

  it('Length should be set correctly.', () => {
    expect(classObject.length).toEqual(data.length);
  });
});

class IteratorPattern_Test<T> extends IteratorPattern<T> { }

describe(aClass(IteratorPattern_Test), () => {

  it('passes', () => {
    expect(true).toBe(true);
  });
});
