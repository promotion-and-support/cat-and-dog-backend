import { ErrorKey } from './error.types';
import { ErrorClass } from './error';

export const createServiceErrorClass = <T extends string>(ParentErrorClass: ErrorClass) => {
  return class ServiceError extends ParentErrorClass {
    static from(e: unknown, key: ErrorKey<T> = 'UNKNOWN') {
      console.log(key, e);
      if (e instanceof ServiceError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return e;
      }
      return new ServiceError(key, { cause: e });
    }
  };
};

export type ServiceErrorClass<T extends string> = ReturnType<typeof createServiceErrorClass<T>>;
export type ServiceErrorInstance<T extends string> = InstanceType<ServiceErrorClass<T>>;
