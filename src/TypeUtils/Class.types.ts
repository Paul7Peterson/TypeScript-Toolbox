import type { Func } from './Function.types';
import type { KeysExcluding, KeysMatching } from './Object.types';

/** Type for TS instance narrowing */
export type ClassTyping<T extends string> = { __class__: T; };

/** Type for a class that returns a given interface */
// eslint-disable-next-line @typescript-eslint/ban-types
export type ClassType<T extends {} = {}> = Func & { // FIXME
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new(...args: any[]): T;
};

/** Extracts the names of the static (class) methods of a given class */
export type StaticMethodName<C extends ClassType | Func> =
  KeysMatching<C, Func>;

/** Extracts the names of the static (class) properties of a given class */
export type StaticPropsName<C extends ClassType> =
  KeysExcluding<C, Func>;

/** Extracts the names of the instance methods of a given class */
export type MethodName<C extends ClassType | Func> =
  keyof C['prototype'];
