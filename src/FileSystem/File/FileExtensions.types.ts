
/** */
export namespace FileExtension {
  /** TypeScript file extension */
  export type TS = 'ts';
  /** SCSS file extension */
  export type SCSS = 'scss';
  /** */
  export type Markdown = 'md';
  /** */
  export type XML = 'xml';
  /** */
  export type Python = 'py';
  /** */
  export type JSON = 'json';
  /** */
  export type YAML = `y${'' | 'a'}ml`;
  /** */
  export type Vue = 'vue';
  /** */
  export type PNG = 'png';
  /** */
  export type SVG = 'svg';
  /** */
  export type PDF = 'pdf';
  /** */
  export type TXT = 'txt';
  /** */
  export type JPEG = `jp${'' | 'e'}g`;

  /** Image files extensions */
  export type Image =
    | JPEG
    | SVG
    | PNG;

  /** Supported files extensions*/
  export type Any =
    | Image
    | JSON
    | XML
    | SCSS
    | Python
    | TS
    | YAML
    | Markdown
    | PDF
    | TXT
    | Vue;
}

/** */
type FileByExtension<E extends FileExtension.Any> = `${string}.${E}`;

/** */
export type FileName<P extends string = string> = `${P}.${FileExtension.Any}`;

export namespace FileType {
  export type TS = FileByExtension<FileExtension.TS>;
  export type SCSS = FileByExtension<FileExtension.SCSS>;
  export type Markdown = FileByExtension<FileExtension.Markdown>;
  export type Python = FileByExtension<FileExtension.Python>;
  export type XML = FileByExtension<FileExtension.XML>;
  export type JSON = FileByExtension<FileExtension.JSON>;
  export type YAML = FileByExtension<FileExtension.YAML>;
  export type Vue = FileByExtension<FileExtension.Vue>;
  export type PNG = FileByExtension<FileExtension.PNG>;
  export type SVG = FileByExtension<FileExtension.SVG>;
  export type PDF = FileByExtension<FileExtension.PDF>;
  export type TXT = FileByExtension<FileExtension.TXT>;
  export type JPEG = FileByExtension<FileExtension.JPEG>;

  export type Any = FileByExtension<FileExtension.Any>;
}

/** */
export type FilePath<P extends string = string> = `${string}/${P}`;

export namespace FilePath {
  export type TS = FilePath<FileType.TS>;
  export type SCSS = FilePath<FileType.SCSS>;
  export type Markdown = FilePath<FileType.Markdown>;
  export type Python = FilePath<FileType.Python>;
  export type XML = FilePath<FileType.XML>;
  export type JSON = FilePath<FileType.JSON>;
  export type YAML = FilePath<FileType.YAML>;
  export type Vue = FilePath<FileType.Vue>;
  export type PNG = FilePath<FileType.PNG>;
  export type SVG = FilePath<FileType.SVG>;
  export type PDF = FilePath<FileType.PDF>;
  export type TXT = FilePath<FileType.TXT>;
  export type JPEG = FilePath<FileType.JPEG>;

  export type Any = FilePath<FileType.Any>;
}


/** */
export type AutoFile<P extends string = string> = TS.File<P> | SCSS.File<P>;

/** */
export type AutoFilePath<P extends string = string> = FilePath<AutoFile<P>>;


/** File types of SCSS */
export namespace SCSS {
  /** */
  export type File<P extends string = string> = `${P}.${FileExtension.SCSS}`;
  export const File = '.scss';
  /** */
  export type AutoFile<P extends string = string> = `${P}.auto.${FileExtension.SCSS}`;
  export const AutoFile: AutoFile = '.auto.scss';

  /** */
  export type Index = File<'index'>;
  export const Index = 'index.scss' as const;
  /** */
  export type AutoIndex = AutoFile<'index'>;
  export const AutoIndex = 'index.auto.scss' as const;
}


/** File types of TypeScript */
export namespace TS {
  /** */
  export type File<P extends string = string> = `${P}.${FileExtension.TS}`;
  export const File = '.ts' as const;
  /** */
  export type AutoFile<P extends string = string> = `${P}.auto.${FileExtension.TS}`;
  export const AutoFile = '.auto.ts' as const;

  /** */
  export type Types<T extends string = string> = File<`${T}.types`>;
  export const Types = '.types.ts' as const;
  /** */
  export type AutoTypes<T extends string = string> = AutoFile<`${T}.types`>;
  export const AutoTypes = '.types.auto.ts' as const;

  /** */
  export type TypesIndex = File<'types'>;
  export const TypesIndex = 'types.ts' as const;
  /** */
  export type AutoTypesIndex = AutoFile<'types'>;
  export const AutoTypesIndex = 'types.auto.ts' as const;

  /** */
  export type DTO<T extends string = string> = File<`${T}.dto`>;
  export const DTO = '.dto.ts' as const;
  /** */
  export type AutoDTO<T extends string = string> = AutoFile<`${T}.dto`>;
  export const AutoDTO = '.dto.auto.ts' as const;

  /** */
  export type FilterDTO<T extends string = string> = File<`${T}.filter.dto`>;
  export const FilterDTO = '.filter.dto.ts' as const;
  /** */
  export type AutoFilterDTO<T extends string = string> = AutoFile<`${T}.filter.dto`>;
  export const AutoFilterDTO = '.filter.dto.auto.ts' as const;

  /** */
  export type Index = File<'index'>;
  export const Index = 'index.ts' as const;
  /** */
  export type AutoIndex = AutoFile<'index'>;
  export const AutoIndex = 'index.auto.ts' as const;
}
