import type { ClassType } from './Class.types';

/** Dictionary */
export type Dict<T> = Record<string, T>;

/** Double dictionary */
export type DoubleDict<T, S extends string = string> = Record<S, Dict<T>>;

/** An alias for `Object` */
export type Obj = object;

/** An empty `Object` equivalent to `{}` */
export type EmptyObj = Dict<never>;

/** Returns the keys of an object with the given type for the value */
export type KeysMatching<T extends Obj | ClassType, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never
}[keyof T];

export type KeysExcluding<T extends Obj | ClassType, V> = {
  [K in keyof T]-?: T[K] extends V ? never : K
}[keyof T];

/** Returns he keys of values that are arrays in an `Object` */
export type KeysOfArrays<T extends Obj> = KeysMatching<T, readonly unknown[]>;

/** Returns the common properties of two objects [intersection] */
export type MappedCommon<A, B> = {
  [K in keyof A & keyof B]:
  A[K] extends B[K] ? never : K
};

/** Creates a type with just the optional values of an object */
export type OptionalKeys<T> = MappedCommon<T, Required<T>>[keyof T];

/** Creates a type to define optional or default values */
export type DefaultProps<T> = Partial<{ [K in OptionalKeys<T>]: T[K] }>;

/** A class that requires no constructor arguments */
export type Instantiable<T> = new () => T;

/** Returns the values of an object */
export type ValuesOf<T> = T[keyof T];

/** A value that can be used as key in an `Object` */
export type ObjectKey = string | number | symbol;


