import { ErrorClass } from '../error/error';

export type IFullState<
  State extends object,
  StatusKey extends string,
  ErrorKey extends string,
> = State & IStatusProps<StatusKey, ErrorKey>;

export interface IStatusProps<StatusKey extends string, ErrorKey extends string> {
  loading: boolean;
  error: InstanceType<ErrorClass<ErrorKey>> | null;
  status: StoreStatusKey<StatusKey>;
}

export type StoreStatusKey<StatusKey extends string> = StatusKey | CommonStatusKey;

export type CommonStatusKey = 'INIT' | 'READY' | 'DISPOSE';
