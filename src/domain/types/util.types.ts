export type OuterJoin<T> =
  | { [key in keyof T]: T[key] }
  | { [key in keyof T]: null };
