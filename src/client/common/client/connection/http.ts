/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { logData } from './utils';
import { HttpResponseErrorCode, HttpResponseError } from './errors';

export const getConnection =
  (baseUrl: string, onError?: (e: unknown) => void) =>
  async (url: string, data: Record<string, any> = {}) => {
    logData(data, 'REQ');
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    };
    try {
      const response = await fetch(baseUrl + url, options);
      const { ok, status } = response;
      if (!ok) throw new HttpResponseError(status as HttpResponseErrorCode);
      const responseData = await response.json();
      logData(responseData, 'RES');
      return responseData;
    } catch (e) {
      console.log(e);
      onError?.(e);
      throw e;
    }
  };
