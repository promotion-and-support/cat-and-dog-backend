export type ITokenParams = { token: string };

export type Nullable<T> = T | null;
export type OmitNull<T> = T extends null ? never : T;

export type IEchoData = Record<string, any>;
