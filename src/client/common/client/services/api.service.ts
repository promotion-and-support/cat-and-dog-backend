import { API_URL } from '../../../local/imports';
import { getApi, IClientApi } from '../../server/client.api';
import { HttpResponseError } from '../connection/errors';
import { getConnection as getHttpConnection } from '../connection/http';
import { getConnection as getWsConnection } from '../connection/ws';
import { Store } from '../lib/store/store';

export class Api extends Store {
  private baseUrl = API_URL;
  private requests = new Set();
  api: IClientApi;

  constructor(
    private onConnect: () => void,
    private onMessage: (data: any) => void,
  ) {
    super({}, undefined, 'INIT');
  }

  async init() {
    try {
      const connection = this.getConnection();
      this.api = getApi(connection);
      await this.api.health();
    } catch (e: any) {
      try {
        if (!e || (e as HttpResponseError).statusCode !== 503) {
          throw new HttpResponseError(503);
        }
        const connection = this.getConnection('ws');
        this.api = getApi(connection);
        await this.api.health();
      } catch (e: any) {
        this.setError(e);
        throw e;
      }
    }
    this.setState({ status: 'READY' });
  }

  getConnection(transport: 'http' | 'ws' = 'http') {
    if (transport === 'http') {
      const connection = getHttpConnection(this.baseUrl);
      return this.interceptor(connection);
    }

    const baseUrl = this.baseUrl.replace('http', 'ws');
    const connection = getWsConnection(baseUrl, this.onConnect, this.onMessage);
    return this.interceptor(connection) as typeof connection;
  }

  interceptor(connection: (...args: any[]) => Promise<any>) {
    const wrapper: typeof connection = async (...args) => {
      const req = {};
      this.setState({ loading: true });
      this.requests.add(req);
      try {
        return await connection(...args);
      } catch (e) {
        this.events.emit('error', e);
        throw e;
      } finally {
        this.requests.delete(req);
        this.setState({ loading: this.requests.size > 0 });
      }
    };
    return wrapper;
  }
}
