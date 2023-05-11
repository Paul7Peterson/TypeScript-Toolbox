import type { Str, StrNum } from '@rimbu/typical';
import type { Digit, Enumerate } from './Number.types';

/** A HTTP or HTTPS URL as literal */
export type HTTP_URL = `http${'' | 's'}://${string}`;

/** */
export type StrPosition<T extends string> =
  Enumerate<Str.Length<T>> extends infer P extends number ? P : never;

/** Gets the type of the first letter of a literal as a literal 
 * 
 * @example
 * ```ts
 * type _1 = FirstLetter<'index.ts'>;     ; type _1 = 'i';       
 * type _2 = FirstLetter<'Pablo'>;        ; type _2 = 'P';     
 * type _3 = FirstLetter<'?what'>;        ; type _3 = '?';      
 * type _4 = FirstLetter<'6' | '_test'>;  ; type _4 = '6' | '_';         
 * type _5 = FirstLetter<''>;             ; type _5 = never;         
 * type _6 = FirstLetter<string>;         ; type _6 = never;   
 * ``` 
 */
export type FirstLetter<T extends string> =
  T extends `${infer First}${string}` ? First : never;

/** 
 * 
 * @example
 * ```ts
 * type _1 = LastLetter<'index.ts'>;     ; type _1 = 's';       
 * type _2 = LastLetter<'Pablo'>;        ; type _2 = 'o';     
 * type _3 = LastLetter<'?what'>;        ; type _3 = 't';      
 * type _4 = LastLetter<'6' | '_test'>;  ; type _4 = '6' | 't';         
 * type _5 = LastLetter<''>;             ; type _5 = false;         
 * type _6 = LastLetter<string>;         ; type _6 = false;  
 * ```
 */
export type LastLetter<T extends string> = Str.Last<T>;

/** To split a string into re-usable components, Tuples are a good way to keep
 * track of the results. Here's a split type.
 * 
 * @example
 * ```ts
 * type _1 = Split<'index.ts', '.'>;            ; type _1 = ['index', 'ts'];
 * type _2 = Split<'src/file.txt', '/' | '.'>;  ; type _2 = ['src/file' | 'src', 'txt'] | ['src/file' | 'src', 'file', 'txt'];
 * type _3 = Split<'index', ''>;                ; type _3 = ['i', 'n', 'd', 'e', 'x'];
 * type _4 = Split<'index', 'o'>;               ; type _4 = ['index'];
 * type _5 = Split<string, 'o'>;                ; type _5 = string[];
 * type _6 = Split<'hello', string>;            ; type _6 = ['h', 'l', 'o'];
 * type _7 = Split<string, string>;             ; type _7 = string[];
 * ``` 
 */
export type Split<S extends string, D extends string> =
  string extends S ? string[] :
  S extends '' ? [] :
  S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] : [S];

/** Provides the literal string of the first literal before another given string literal.
 * 
 * @example
 * ```ts
 * type _1 = FirstOf<'index.ts', '.'>;         ; type _1 = 'index';       
 * type _2 = FirstOf<'Pablo', ''>;             ; type _2 = 'P';     
 * type _3 = FirstOf<'abbcb', 'cb'>;           ; type _3 = 'abb';      
 * type _4 = FirstOf<'12.5698', '.'>;          ; type _4 = '12';         
 * type _5 = FirstOf<'aabccbalo', 'b' | 'c'>;  ; type _5 = 'aa' | 'aab';         
 * type _6 = FirstOf<string, string>;          ; type _6 = string;   
 * type _7 = FirstOf<'abc', string>;           ; type _7 = 'a';   
 * type _8 = FirstOf<'abc', ''>;               ; type _8 = 'a';   
 * type _9 = FirstOf<'', ''>;                  ; type _9 = string;    
 * ``` 
 */
export type FirstOf<T extends string, S extends string> =
  T extends `${infer X extends string}${S}${string}` ? X : string;

/** Provides the literal string of the first literal before another given string literal.
 * 
 * @example
 * ```ts
 * type _1 = AfterFirst<'index.ts', '.'>;         ; type _1 = 'ts';       
 * type _2 = AfterFirst<'Pablo', ''>;             ; type _2 = 'ablo';     
 * type _3 = AfterFirst<'abbcb', 'cb'>;           ; type _3 = '';      
 * type _4 = AfterFirst<'12.5698', '.'>;          ; type _4 = '5698';         
 * type _5 = AfterFirst<'aabccbalo', 'b' | 'c'>;  ; type _5 = 'ccbalo' | 'cbalo';         
 * type _6 = AfterFirst<string, string>;          ; type _6 = string;   
 * type _7 = AfterFirst<'abc', string>;           ; type _7 = 'c';   
 * type _8 = AfterFirst<'abc', ''>;               ; type _8 = 'bc';   
 * type _9 = AfterFirst<'', ''>;                  ; type _9 = string;    
 * ``` 
 */
export type AfterFirst<T extends string, S extends string> =
  T extends `${string}${S}${infer X}` ? X : string;

/** 
 * @example`
 * ```ts
 * type _1 = LastOf<'index.ts', '.'>;         ; type _1 = 'ts';       
 * type _2 = LastOf<'Pablo', ''>;             ; type _2 = 'o';     
 * type _3 = LastOf<'abbcb', 'cb'>;           ; type _3 = 'abb';      
 * type _4 = LastOf<'12.5698', '.'>;          ; type _4 = '5698';         
 * type _5 = LastOf<'aabccbalo', 'b' | 'c'>;  ; type _5 = 'alo';         
 * type _6 = LastOf<string, string>;          ; type _6 = string;   
 * type _7 = LastOf<'abc', string>;           ; type _7 = 'c';   
 * type _8 = LastOf<'abc', ''>;               ; type _8 = 'c';   
 * type _9 = LastOf<'', ''>;                  ; type _9 = string;  
 * ```
*/
export type LastOf<T extends string, S extends string> =
  Split<T, S> extends [...string[], infer TT extends string] ? TT : string;

/** Provides the literal string where part after the last `.` has been removed.
 * If not `.` is found, the result is `string`.
 * 
 * @example
 * ```ts
 * type _1 = NoFileExtension<'index.ts'>;       ; type _1 = 'index';
 * type _2 = NoFileExtension<'./src/file.txt'>; ; type _2 = './src/file';
 * type _3 = NoFileExtension<'index'>;          ; type _3 = string;
 * type _4 = NoFileExtension<string>;           ; type _4 = string;
 * type _5 = NoFileExtension<''>;               ; type _5 = string;
 * ``` 
 */
export type NoFileExtension<T extends string> =
  FirstOf<T, `.${LastOf<T, '.'>}`>;

/** Provides the literal string after the last `.` of a string literal. 
 * 
 * @example
 * ```ts
 * type _1 = FileExtension<'index.ts'>;         ; type _1 = 'ts';
 * type _2 = FileExtension<'./src/file.txt'>;   ; type _2 = 'txt';
 * type _3 = FileExtension<'index'>;            ; type _3 = 'index';
 * type _4 = FileExtension<string>;             ; type _4 = string;
 * type _5 = FileExtension<''>;                 ; type _5 = string;
 * ``` 
 */
export type ExtractFileExtension<T extends string> =
  LastOf<T, '.'>;

/** Provides the literal string after the last `/` of a string literal. 
 * 
 * @example
 * ```ts
 * type _1 = FileName<'index.ts'>;         ; type _1 = 'index.ts';
 * type _2 = FileName<'./src/file.txt'>;   ; type _2 = 'file.txt';
 * type _3 = FileName<'index'>;            ; type _3 = 'index';
 * type _4 = FileName<string>;             ; type _4 = string;
 * type _5 = FileName<''>;                 ; type _5 = string;
 * ``` 
 */
export type ExtractFileName<T extends string> =
  LastOf<T, '/'>;

/** */
export type ReplaceAllIf<T extends string, S extends string & Str.NonEmptyString<S>, R extends string> =
  Str.ReplaceAll<T, S, R> extends infer X extends string ? X : T;

/** Converts a String literal into a number literal 
 * Only works with positive numbers.
 * 
 * **Warning:** Truncates values to integers and returns 0 is the value isNaN or negative.
 * 
 * @example
 * ```ts
 * type _1 = ToNumber<'0'>;                ; type _1 = 0;
 * type _2 = ToNumber<'a'>;                ; type _2 = 0;
 * type _3 = ToNumber<'1.84'>;             ; type _3 = 1;
 * type _4 = ToNumber<'1' | '6.84'>;       ; type _4 = 1 | 6;
 * type _5 = ToNumber<'-8' | 'Infinity'>;  ; type _5 = 0;
 * ``` 
*/
export type ToNumber<T extends string> = StrNum.ToNumber<T>;

/** Turns a primitive into a string type 
 * 
 * @example
 * ```ts
 * type _1 = Stringify<0>;          ; type _1 = '0';
 * type _2 = Stringify<false>;      ; type _2 = 'false';
 * type _3 = Stringify<0 | true>;   ; type _3 = '0' | 'true';
 * ``` 
 */
export type Stringify<N extends number | boolean> = `${N}`;

/** Asserts that a type is a string 
 * 
 * @example
 * ```ts
 * type _1 = AssertString<0>;        ; type _1 = never;
 * type _2 = AssertString<'a'>;      ; type _2 = 'a';
 * type _3 = AssertString<0 | '4'>;  ; type _3 = '4';
 * ``` 
 */
export type AssertString<X> = X extends infer K extends string ? K : never;

/** Includes the literals for [A-Z] */
export type CapitalLetter =
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I'
  | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R'
  | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

/** Includes the literals for [a-z] */
export type Letter = Lowercase<CapitalLetter>;

/** Includes the literals for [0-9] and [a-z] */
export type DigitOrLetter = Digit | Letter;

/** Tries to pluralize a word */
export type Plural<T extends string> = 'y' extends LastLetter<T>
  ? (T extends `${infer Z}y` ? `${Z}ies` : never)
  : `${T}s`;
