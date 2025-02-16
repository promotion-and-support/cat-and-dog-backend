/* eslint-disable max-lines */
/* eslint-disable max-len */
import * as P from './types/types';
import * as Q from './types/client.api.types';

export type IClientApi = ReturnType<typeof getApi>;

export const getApi = (
  fetch: <T>(pathname: string, options?: Record<string, any>) => Promise<T>
) => ({
  'health': () => fetch<string>('/health'),

  'echo': (options: P.IEchoData) =>
    fetch<P.IEchoData>('/echo', options),

  'account': {
    'confirm': (options: P.ITokenParams) =>
      fetch<P.IUserResponse>('/account/confirm', options),

    'login': (options: P.ILoginParams) =>
      fetch<P.IUserResponse>('/account/login', options),

    'logout': () => fetch<boolean>('/account/logout'),

    'overmail': (options: P.IEnterParams) =>
      fetch<boolean>('/account/overmail', options),

    'overtg': (options: Q.TAccountOvertg) =>
      fetch<P.IUserResponse>('/account/overtg', options),

    'remove': () => fetch<boolean>('/account/remove'),

    'restore': (options: P.ITokenParams) =>
      fetch<P.IUserResponse>('/account/restore', options),

    'signup': (options: P.ISignupParams) =>
      fetch<P.IUserResponse>('/account/signup', options),

    'signupTg': (options: Q.TAccountSignupTg) =>
      fetch<P.IUserResponse>('/account/signupTg', options),

    'messenger': {
      'get': {
        'name': () => fetch<string>('/account/messenger/get/name'),

      },
      'link': {
        'get': () => fetch<Q.TAccountMessengerLinkGetResponse>('/account/messenger/link/get'),

        'connect': (options: P.IMessengerLinkConnectParams) =>
          fetch<boolean>('/account/messenger/link/connect', options),

      },
    },
  },
  'user': {
    'read': () => fetch<P.IUserResponse>('/user/read'),

    'update': (options: P.IUserUpdateParams) =>
      fetch<P.IUserResponse>('/user/update', options),

  },
});
