/** An alias for `Function` */
// eslint-disable-next-line @typescript-eslint/ban-types
export type Func = Function;

/** The predicate tuple or arguments  of array methods */
export type ArrayPredicate<T> = [item: T, index: number, self: T[]];
