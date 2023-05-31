import { FileExtension, FilePath } from './FileExtensions.types';

const FILE_REGEX = new RegExp(/^(\w+|\.|\..)\/(\w+\/)*\w+(\.\w+)*\.(\w{1,4})/i);

const SUPPORTED_EXTENSION = new RegExp(/\w+\.(ts|xml|json|png|svg|pdf|txt|y(a)?ml|jp(e)?g|scss|vue|md)/i);

/** */
export function isFilePath (path: string): path is FilePath<`${string}.${FileExtension.Any}`> {
  return FILE_REGEX.test(path) && hasSupportedExtension(path);
}

/** */
export function hasSupportedExtension (path: string): path is `${string}.${FileExtension.Any}` {
  return SUPPORTED_EXTENSION.test(path);
}

/** Asserts that a file path is `*.json` */
export function isJSONFile<P extends string> (path: `${P}.${FileExtension.Any}`): path is `${P}.${FileExtension.JSON}` {
  return path.endsWith('.json');
}

/** Asserts that a file path is `*.xml` */
export function isXMLFile<P extends string> (path: `${P}.${FileExtension.Any}`): path is `${P}.${FileExtension.XML}` {
  return path.endsWith('.xml');
}

/** Asserts that a file path is `*.ts` */
export function isTSFile<P extends string> (path: `${P}.${FileExtension.Any}`): path is `${P}.${FileExtension.TS}` {
  return path.endsWith('.ts');
}

/** Asserts that a file path is `*.jpeg` or `*.jpg` */
export function isJPEGFile<P extends string> (path: `${P}.${FileExtension.Any}`): path is `${P}.${FileExtension.JPEG}` {
  return path.endsWith('.jpeg') || path.endsWith('.jpg');
}

/** Asserts that a file path is `*.png` */
export function isPNGFile<P extends string> (path: `${P}.${FileExtension.Any}`): path is `${P}.${FileExtension.PNG}` {
  return path.endsWith('.png');
}

/** Asserts that a file path is `*.yml` or `*.yaml` */
export function isYAMLFile<P extends string> (path: `${P}.${FileExtension.Any}`): path is `${P}.${FileExtension.YAML}` {
  return path.endsWith('.yml') || path.endsWith('.yaml');
}

/** Asserts that a file path is `*.svg` */
export function isSVGFile<P extends string> (path: `${P}.${FileExtension.Any}`): path is `${P}.${FileExtension.SVG}` {
  return path.endsWith('.svg');
}

/** Asserts that a file path is `*.md` */
export function isMarkdownFile<P extends string> (path: `${P}.${FileExtension.Any}`): path is `${P}.${FileExtension.Markdown}` {
  return path.endsWith('.md');
}

/** Asserts that a file path is `*.vue` */
export function isVueFile<P extends string> (path: `${P}.${FileExtension.Any}`): path is `${P}.${FileExtension.Vue}` {
  return path.endsWith('.vue');
}

/** Asserts that a file path is `*.scss` */
export function isSCSSFile<P extends string> (path: `${P}.${FileExtension.Any}`): path is `${P}.${FileExtension.SCSS}` {
  return path.endsWith('.scss');
}

/** Asserts that a file path is `*.pdf` */
export function isPDFFile<P extends string> (path: `${P}.${FileExtension.Any}`): path is `${P}.${FileExtension.PDF}` {
  return path.endsWith('.pdf');
}

/** Asserts that a file path is `*.txt` */
export function isTXTFile<P extends string> (path: `${P}.${FileExtension.Any}`): path is `${P}.${FileExtension.TXT}` {
  return path.endsWith('.txt');
}