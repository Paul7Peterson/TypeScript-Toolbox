import { aFunction } from '@paul7peterson/typescript-toolbox';
import {
  camelCase,
  capitalize,
  first,
  kebabCase,
  last,
  lower,
  pascalCase,
  removeAll,
  removeExtension,
  replaceAll,
  reverse,
  snakeCase,
  uncapitalize,
  upper,
} from './Str.helpers';

describe(aFunction(kebabCase), () => {

  it('transforms the strings into kebab case', () => {
    expect(kebabCase('the quick brown fox')).toEqual('the-quick-brown-fox');
    expect(kebabCase('the-quick-brown-fox')).toEqual('the-quick-brown-fox');
    expect(kebabCase('the_quick_brown_fox')).toEqual('the-quick-brown-fox');
    expect(kebabCase('theQuickBrownFox')).toEqual('the-quick-brown-fox');
    expect(kebabCase('theQuickBrown Fox')).toEqual('the-quick-brown-fox');
    expect(kebabCase('thequickbrownfox')).toEqual('thequickbrownfox');
    expect(kebabCase('the - quick * brown# fox')).toEqual('the-quick-brown-fox');
    expect(kebabCase('theQUICKBrownFox')).toEqual('the-quick-brown-fox');
  });
});

describe(aFunction(capitalize), () => {

  it('convert first character of string literal type to uppercase', () => {
    expect(capitalize('capitals')).toEqual('Capitals');
    expect(capitalize('Capitals')).toEqual('Capitals');
    expect(capitalize('CapiTALS')).toEqual('CapiTALS');
    expect(capitalize('many Words')).toEqual('Many Words');
    expect(capitalize('!exclaim')).toEqual('!exclaim');
  });
});

describe(aFunction(uncapitalize), () => {
  it('convert first character of string literal type to lowercase', () => {
    expect(uncapitalize('Capitals')).toEqual('capitals');
    expect(uncapitalize('capitals')).toEqual('capitals');
    expect(uncapitalize('capiTALS')).toEqual('capiTALS');
    expect(uncapitalize('Many Words')).toEqual('many Words');
    expect(uncapitalize('!exclaim')).toEqual('!exclaim');
  });
});

describe(aFunction(pascalCase), () => {

  it('transforms the strings into Pascal case', () => {
    expect(pascalCase('the quick brown fox')).toEqual('TheQuickBrownFox');
    expect(pascalCase('the_quick_brown_fox')).toEqual('TheQuickBrownFox');
    expect(pascalCase('the-quick-brown-fox')).toEqual('TheQuickBrownFox');
    expect(pascalCase('theQuickBrownFox')).toEqual('TheQuickBrownFox');
    expect(pascalCase('thequickbrownfox')).toEqual('Thequickbrownfox');
    expect(pascalCase('the - quick * brown# fox')).toEqual('TheQuickBrownFox');
    expect(pascalCase('theQUICKBrownFox')).toEqual('TheQUICKBrownFox');
    expect(pascalCase('the QUICK BrownFox')).toEqual('TheQUICKBrownFox');
  });
  it('preserves the capitalized prefix', () => {
    expect(pascalCase('THEQuickBrownFox')).toEqual('THEQuickBrownFox');
  });
  it('preserves the capitalized suffix', () => {
    expect(pascalCase('TheQuickBrownFOX')).toEqual('TheQuickBrownFOX');
  });
  it('preserves the capitalized infix', () => {
    expect(pascalCase('theQUICKBrownFox')).toEqual('TheQUICKBrownFox');
  });
});

describe(aFunction(snakeCase), () => {

  it('transforms the strings into snake case', () => {
    expect(snakeCase('the quick brown fox')).toEqual('the_quick_brown_fox');
    expect(snakeCase('the-quick-brown-fox')).toEqual('the_quick_brown_fox');
    expect(snakeCase('the_quick_brown_fox')).toEqual('the_quick_brown_fox');
    expect(snakeCase('theQuickBrownFox')).toEqual('the_quick_brown_fox');
    expect(snakeCase('theQuickBrown Fox')).toEqual('the_quick_brown_fox');
    expect(snakeCase('thequickbrownfox')).toEqual('thequickbrownfox');
    expect(snakeCase('the - quick * brown# fox')).toEqual('the_quick_brown_fox');
    expect(snakeCase('theQUICKBrownFox')).toEqual('the_q_u_i_c_k_brown_fox');
  });
});

describe(aFunction(camelCase), () => {

  it('transforms the strings into camel case', () => {
    expect(camelCase('the quick brown fox')).toEqual('theQuickBrownFox');
    expect(camelCase('the_quick_brown_fox')).toEqual('theQuickBrownFox');
    expect(camelCase('the-quick-brown-fox')).toEqual('theQuickBrownFox');
    expect(camelCase('theQuickBrownFox')).toEqual('theQuickBrownFox');
    expect(camelCase('thequickbrownfox')).toEqual('thequickbrownfox');
    expect(camelCase('the - quick * brown# fox')).toEqual('theQuickBrownFox');
    expect(camelCase('behold theQuickBrownFox')).toEqual('beholdTheQuickBrownFox');
    expect(camelCase('Behold theQuickBrownFox')).toEqual('beholdTheQuickBrownFox');
    expect(camelCase('The quick brown FOX')).toEqual('theQuickBrownFox');
  });
  it('uncapitalize the capitalized prefix having more than 2 letters', () => {
    expect(camelCase('THEQuickBrownFox')).toEqual('theQuickBrownFox');
  });
  it('uncapitalize only the first letter of the capitalized prefix having 2 letters', () => {
    expect(camelCase('DAQuickBrownFox')).toEqual('dAQuickBrownFox');
  });
  it('preserves the capitalized suffix having less than 4 letters', () => {
    expect(camelCase('TheQuickBrownFOX')).toEqual('theQuickBrownFOX');
  });
  it('uncapitalize only the first letter of the suffix having more than 3 letters', () => {
    expect(camelCase('TheQuickBrownFOXX')).toEqual('theQuickBrownFoxx');
  });
  it('preserves the capitalized infix having less than 4 letters', () => {
    expect(camelCase('theQUickBrownFox')).toEqual('theQUickBrownFox');
    expect(camelCase('theQUIckBrownFox')).toEqual('theQUIckBrownFox');
  });
  it('preserves only the first letter of the capitalized infix having more than 3 letters', () => {
    expect(camelCase('theCOOLBrownFox')).toEqual('theCoolBrownFox');
  });
});

describe(aFunction(upper), () => {
  it('transforms the strings into all upper case characters', () => {
    expect(upper('Capitals')).toEqual('CAPITALS');
    expect(upper('capitals')).toEqual('CAPITALS');
    expect(upper('capiTALS')).toEqual('CAPITALS');
    expect(upper('Many Words')).toEqual('MANY WORDS');
    expect(upper('!exclaim')).toEqual('!EXCLAIM');
  });
});

describe(aFunction(lower), () => {
  it('transforms the strings into all lower case characters', () => {
    expect(lower('Capitals')).toEqual('capitals');
    expect(lower('capitals')).toEqual('capitals');
    expect(lower('capiTALS')).toEqual('capitals');
    expect(lower('Many Words')).toEqual('many words');
    expect(lower('!EXCLAIM')).toEqual('!exclaim');
  });
});

describe(aFunction(removeAll), () => {
  it('removes a given substring', () => {
    expect(removeAll('Capitals', 'ital')).toEqual('Caps');
    expect(removeAll('Capitals', 'Cap')).toEqual('itals');
    expect(removeAll('Capitals', 'tals')).toEqual('Capi');
    expect(removeAll('Capitals', 'caps')).toEqual('Capitals');
    expect(removeAll('!exclaim', '!')).toEqual('exclaim');
  });
});

describe(aFunction(replaceAll), () => {
  it('replaces a given substring', () => {
    expect(replaceAll('Capitals', 'ital', 'ITAL')).toEqual('CapITALs');
    expect(replaceAll('Capitals', 'Cap', 'ABC')).toEqual('ABCitals');
    expect(replaceAll('The old string', 'old', 'new')).toEqual('The new string');
    expect(replaceAll('The old string "Old"', 'old', 'new')).toEqual('The new string "Old"');
    expect(replaceAll('The old string "old"', 'old', 'new')).toEqual('The new string "new"');
  });
});

describe(aFunction(first), () => {
  it('returns substring before separator', () => {
    expect(first('MyString', 'S')).toEqual('My');
    expect(first('This is my string', ' ')).toEqual('This');
  });
});

describe(aFunction(last), () => {
  it('returns substring after separator', () => {
    expect(last('MyString', 'S')).toEqual('tring');
    expect(last('This is my string', ' ')).toEqual('is my string');
    expect(last('This,is,my,string', ',')).toEqual('is,my,string');
  });
});

describe(aFunction(removeExtension), () => {
  it('removes the substring after a \'.\' from the string', () => {
    expect(removeExtension('MyFile.ts')).toEqual('MyFile');
    expect(removeExtension('MyFile.spec.ts')).toEqual('MyFile.spec');
  });
});

describe(aFunction(reverse), () => {
  it('removes the substring after a \'.\' from the string', () => {
    expect(reverse('That is my sentence.')).toEqual('.ecnetnes ym si tahT');
    expect(reverse('Rentner')).toEqual('rentneR');
  });
});
