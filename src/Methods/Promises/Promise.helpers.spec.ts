import { aFunction } from '@paul7peterson/typescript-toolbox';
import { awaitClassified, awaitRejected, awaitResolved } from './Promise.helpers';

describe(aFunction(awaitResolved), () => {

  it('returns empty array on no promises', async () => {
    const result = await awaitResolved([]);

    expect(result).toHaveLength(0);
  });

  it('returns only resolved promises', async () => {
    const result = await awaitResolved([
      Promise.resolve(),
      Promise.resolve(),
      Promise.reject(),
    ]);

    expect(result).toHaveLength(2);
  });

  it('returns no items if all promises as rejected', async () => {
    const result = await awaitResolved([
      Promise.reject(),
      Promise.reject(),
    ]);

    expect(result).toHaveLength(0);
  });
});

describe(aFunction(awaitRejected), () => {

  it('returns empty array on no promises', async () => {
    const result = await awaitRejected([]);

    expect(result).toHaveLength(0);
  });

  it('returns only rejected promises', async () => {
    const result = await awaitRejected([
      Promise.reject(),
      Promise.reject(),
      Promise.resolve({}),
    ]);

    expect(result).toHaveLength(2);
  });

  it('returns no items if all promises as resolved', async () => {
    const result = await awaitRejected([
      Promise.resolve({}),
      Promise.resolve({}),
    ]);

    expect(result).toHaveLength(0);
  });
});

describe(aFunction(awaitClassified), () => {

  it('returns empty arrays on no promises', async () => {
    const { resolved, rejected } = await awaitClassified([]);

    expect(rejected).toHaveLength(0);
    expect(resolved).toHaveLength(0);
  });

  it('returns a classification of rejected and resolved promises', async () => {
    const { resolved, rejected } = await awaitClassified([
      Promise.reject(),
      Promise.resolve(),
      Promise.reject(),
      Promise.reject(),
      Promise.resolve(),
    ]);

    expect(rejected).toHaveLength(3);
    expect(resolved).toHaveLength(2);
  });
});
