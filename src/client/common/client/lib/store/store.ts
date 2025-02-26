/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { EventEmitter } from '../event-emitter/event.emitter';
import { createErrorClass, ErrorClass, ErrorInstance } from '../error/error';
import { ServiceErrorClass, ServiceErrorInstance } from '../error/service.error';
import { isChanged, toConsole } from '../utils';
import { IStatusProps, IFullState, StoreStatusKey } from './store.types';

export class Store<
  State extends object = object,
  StatusKey extends string = string,
  ErrorKey extends string = string,
  FullState extends IFullState<State, StatusKey, ErrorKey> = IFullState<State, StatusKey, ErrorKey>,
> {
  protected $state: State;

  events = new EventEmitter();

  protected loading = false;

  protected status: StoreStatusKey<StatusKey>;

  protected error: ErrorInstance<ErrorKey> | ServiceErrorInstance<ErrorKey> | null = null;

  protected ac: AbortController | null = null;

  protected timer?: number;

  constructor(
    protected initialState: State,
    public Error: ErrorClass<ErrorKey> | ServiceErrorClass<ErrorKey> = createErrorClass<ErrorKey>(),
    protected initialStatus: StoreStatusKey<StatusKey> = 'READY',
  ) {
    this.$state = { ...this.initialState };
    this.status = initialStatus;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async init() {
    this.debug('Init method is not implemented');
  }

  get state(): FullState {
    return { ...this.$state, ...this.statusProps } as FullState;
  }

  protected get statusProps() {
    const { loading, status, error } = this;
    return { loading, status, error };
  }

  protected setState(newState: Partial<FullState>) {
    const { loading, status, error, ...otherProps } = newState;
    let statusChanged = false;
    if (typeof loading !== 'undefined') {
      this.loading = loading;
      statusChanged = true;
    }
    if (typeof status !== 'undefined') {
      this.status = status;
      statusChanged = true;
    }
    if (typeof error !== 'undefined') {
      this.error = error;
      statusChanged = true;
    }
    Object.assign(this.$state, otherProps);
    this.events.emit('state', this.state);
    if (statusChanged) {
      this.events.emit('status', this.statusProps);
    }
  }

  protected setError(
    e: unknown,
    key?: ErrorInstance<ErrorKey>['key'],
    partialState?: Partial<FullState>,
  ) {
    const error = this.Error.from(e, key);
    this.error = error;
    this.abort();
    this.setState({ error, ...partialState } as FullState);
    return error;
  }

  subscribe(
    cb: (state: FullState) => unknown,
    keys: (keyof FullState)[] = [],
    as: AbortSignal | null = null,
    emitStateOnInit = false,
  ) {
    let curState = this.state;

    const handler = (newState: FullState) => {
      const changed = isChanged(keys, curState, newState);
      curState = newState;
      if (changed) cb(curState);
    };

    const off = this.events.on('state', handler);
    as?.addEventListener('abort', off);
    if (emitStateOnInit) cb(curState);

    return off;
  }

  useState(keys: (keyof FullState)[] = [], ...args: unknown[]) {
    const [state, setState] = useState(() => this.state);

    this.debug(...args);

    useEffect(() => {
      return this.subscribe(setState, keys, null, false);
    }, [...keys]);

    return state;
  }

  useStatus(keys: (keyof IStatusProps<StatusKey, ErrorKey>)[] = [], ...args: unknown[]) {
    const [state, setState] = useState(() => this.statusProps);

    this.debug(...args);

    useEffect(() => {
      let curStatusProps = this.statusProps;

      const handler = (newStatusProps: IStatusProps<StatusKey, ErrorKey>) => {
        const changed = isChanged(keys, curStatusProps, newStatusProps);
        curStatusProps = newStatusProps;
        if (changed) setState(curStatusProps);
      };

      return this.events.on('status', handler);
    }, [...keys]);

    return state as IStatusProps<StatusKey, ErrorKey>;
  }

  async *getIterator(
    keys: (keyof FullState)[] = [],
    as?: AbortSignal,
    emitStateOnInit = false,
  ): AsyncGenerator<FullState> {
    let resolve: ((state: FullState) => void) | undefined;
    const setResolve = (rv: (state: FullState) => void) => {
      resolve = (state: FullState) => {
        resolve = undefined;
        rv(state);
      };
    };

    const eventQueue: FullState[] = [];
    const onState = (newState: FullState) => {
      if (resolve) {
        resolve(newState);
      } else {
        eventQueue.push(newState);
      }
    };
    const off = this.subscribe(onState, keys, as, emitStateOnInit);

    let aborted = false;
    const onAbort = () => {
      aborted = true;
      off();
      resolve?.({} as FullState);
    };
    this.ac?.signal.addEventListener('abort', onAbort);
    as?.addEventListener('abort', onAbort);

    do {
      let newState = eventQueue.shift();
      if (newState) {
        yield newState;
      } else {
        newState = await new Promise(setResolve);
        if (aborted) {
          return;
        }
        yield newState;
      }
    } while (!aborted);
  }

  useLoading(startDelay?: number, stopDelay?: number) {
    const [value, setValue] = useState(false);

    useEffect(() => {
      let timer: number | undefined;
      const start = () => {
        setValue(true);
        timer = undefined;
      };
      const stop = () => {
        setValue(false);
        timer = undefined;
      };
      let handleStart = start;
      let handleStop = stop;
      if (startDelay) {
        handleStart = () => {
          timer = setTimeout(start, startDelay, true);
        };
      }
      if (stopDelay) {
        handleStop = () => {
          timer = setTimeout(stop, stopDelay, false);
        };
      }
      let prevLoading = false;
      const handler = () => {
        if (this.loading === prevLoading) {
          return;
        }
        prevLoading = this.loading;
        clearTimeout(timer);
        if (timer) {
          timer = undefined;
        } else if (this.loading) {
          handleStart();
        } else {
          handleStop();
        }
      };
      return this.events.on('status', handler);
    }, [startDelay, stopDelay]);

    return value;
  }

  protected getFromStorage(): FullState {
    const key = this.constructor.name;
    try {
      const stateSerialized = localStorage.getItem(key);
      return JSON.parse(stateSerialized || '{}') as FullState;
    } catch {
      return {} as FullState;
    }
  }

  protected saveToStorage() {
    const key = this.constructor.name;
    try {
      const stateSerialized = JSON.stringify(this.state);
      localStorage.setItem(key, stateSerialized);
    } catch (e) {
      this.debug(e);
    }
  }

  debug(...args: unknown[]) {
    toConsole(this, ...args);
  }

  abort() {
    this.setState({ loading: false } as FullState);
    if (!this.ac) {
      return;
    }
    this.ac.abort();
    this.ac = null;
    if (this.error) {
      return;
    }
    this.setError(null, 'ABORT');
  }

  clear(withStatus?: StoreStatusKey<StatusKey>) {
    clearTimeout(this.timer);
    this.abort();
    const status = withStatus || this.initialStatus;
    const error = null;
    this.setState({ ...this.initialState, error, status });
  }

  set toDispose(cb: () => void) {
    this.events.once('dispose', cb);
  }

  dispose() {
    this.setState({ status: 'DISPOSE' } as Partial<FullState>);
    this.events.emit('dispose', {});
    clearTimeout(this.timer);
    this.ac?.abort();
    this.events.offAll();
    this.saveToStorage();
  }
}
