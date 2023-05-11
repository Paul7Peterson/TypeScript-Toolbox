export type TestType<T1, T2, Is extends (T1 extends T2 ? (T2 extends T1 ? true : false) : false)> = `Is ${Is}`;

// export type TestIfTrue<T1, T2 extends (T1 extends T2 ? (T1 extends T2 ? unknown : never) : never)> = '';
