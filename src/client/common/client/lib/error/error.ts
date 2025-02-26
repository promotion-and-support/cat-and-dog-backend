import { ErrorKey } from './error.types';

export const createErrorClass = <T extends string>() => {
  return class ErrorClass extends Error {
    static from(e: unknown, key: ErrorKey<T> = 'UNKNOWN') {
      console.log(key, e);
      if (e instanceof ErrorClass) {
        return e;
      }
      return new ErrorClass(key, { cause: e });
    }

    constructor(
      public key: ErrorKey<T> = 'UNKNOWN',
      options: Parameters<ErrorConstructor>[1],
    ) {
      super(key, options);
    }
  };
};

export type ErrorClass<T extends string = string> = ReturnType<typeof createErrorClass<T>>;
export type ErrorInstance<T extends string> = InstanceType<ErrorClass<T>>;
