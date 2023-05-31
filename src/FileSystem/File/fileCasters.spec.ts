import { aFunction } from '@paul7peterson/typescript-toolbox';
import { hasSupportedExtension, isFilePath } from './fileCasters';

describe(aFunction(isFilePath), () => {
  it('identifies a proper path', () => {
    expect(isFilePath('./file.ts')).toBe(true);
    expect(isFilePath('./file.type.ts')).toBe(true);
    expect(isFilePath('../file.ts')).toBe(true);
    expect(isFilePath('../file.type.ts')).toBe(true);
    expect(isFilePath('folder/file.ts')).toBe(true);
    expect(isFilePath('folder/file.type.ts')).toBe(true);
    expect(isFilePath('./folder/file.ts')).toBe(true);
    expect(isFilePath('../folder/file.type.ts')).toBe(true);
    expect(isFilePath('folder/anotherFolder/file.type.ts')).toBe(true);
    expect(isFilePath('./folder/anotherFolder/file.type.ts')).toBe(true);
    expect(isFilePath('./folder/anotherFolder/file.type.ts')).toBe(true);
  });

  it('fails on wrong path format', () => {
    expect(isFilePath('/file.ts')).toBe(false);
    expect(isFilePath('/file.type.ts')).toBe(false);
    expect(isFilePath('~app/file.ts')).toBe(false);
    expect(isFilePath('@package/file.type.ts')).toBe(false);
  });
});

describe(aFunction(hasSupportedExtension), () => {
  it('identifies a proper path', () => {
    expect(hasSupportedExtension('any.ts')).toBe(true);
    expect(hasSupportedExtension('any.md')).toBe(true);
    expect(hasSupportedExtension('any.pdf')).toBe(true);
    expect(hasSupportedExtension('any.txt')).toBe(true);
    expect(hasSupportedExtension('any.jpeg')).toBe(true);
    expect(hasSupportedExtension('any.jpg')).toBe(true);
    expect(hasSupportedExtension('any.yaml')).toBe(true);
    expect(hasSupportedExtension('any.yml')).toBe(true);
    expect(hasSupportedExtension('any.xml')).toBe(true);
    expect(hasSupportedExtension('any.json')).toBe(true);
    expect(hasSupportedExtension('any.vue')).toBe(true);
    expect(hasSupportedExtension('any.scss')).toBe(true);
  });

  it('fails on wrong path format', () => {
    expect(hasSupportedExtension('any.text')).toBe(false);
    expect(hasSupportedExtension('any.typescript')).toBe(false);
    expect(hasSupportedExtension('any.c')).toBe(false);
  });
});
