import { aFunction } from '@paul7peterson/typescript-toolbox';
import { hyphenPerSpace, spacePerHyphen, spacePerUnderScore, underscorePerSpace } from './language.helpers';

describe(aFunction(underscorePerSpace), () => {

  const input = 'hello_world!';

  it('replaces all underscores per space', () => {
    const converted = underscorePerSpace(input);

    expect(converted).toBe('hello world!');
  });
});

describe(aFunction(spacePerUnderScore), () => {

  const input = 'hello world!';

  it('replaces all spaces per underscore', () => {
    const converted = spacePerUnderScore(input);

    expect(converted).toBe('hello_world!');
  });
});

describe(aFunction(hyphenPerSpace), () => {

  const input = 'hello-world!';

  it('replaces all hyphens per space', () => {
    const converted = hyphenPerSpace(input);

    expect(converted).toBe('hello world!');
  });
});

describe(aFunction(spacePerHyphen), () => {

  const input = 'hello world!';

  it('replaces all spaces per hyphens', () => {
    const converted = spacePerHyphen(input);

    expect(converted).toBe('hello-world!');
  });
});
