import { setTimeout, setInterval } from 'node:timers';
import {
  THandler,
  IEndpoints,
  TInputModule,
  IContext,
  TOutputModule,
  IController,
  IControllerConfig,
  ITask,
} from './types';
import { IOperation, TOperationResponse } from '../types/operation.types';
import { ControllerError } from './errors';
import { isHandler } from './utils';
import { errorHandler } from './methods/error.handler';
import { createClientApi } from './methods/create.client.api';
import { createInputModules, createOutputModules } from './methods/modules';
import { getServices } from './methods/services';
import { createRoutes } from './methods/create.endpoints';
import { setToGlobal } from '../app/methods/utils';
import { pathToArray } from '../utils/utils';
import * as cryptoService from '../utils/crypto';
import * as domain from '../domain/index';

class Controller implements IController {
  private endpoints?: IEndpoints;
  private execInputModules?: ReturnType<TInputModule>;
  private execOutputModules?: ReturnType<TOutputModule>;
  private inited = false;

  constructor(private config: IControllerConfig) {}

  async init() {
    try {
      const services = getServices(this.config);
      Object.assign(globalThis, services);
      setToGlobal('cryptoService', cryptoService);
      setToGlobal('domain', domain);
    } catch (e: any) {
      logger.error(e);
      throw new ControllerError('SERVICE_ERROR');
    }

    try {
      this.execInputModules = createInputModules(this.config);
      this.execOutputModules = createOutputModules(this.config);
    } catch (e: any) {
      logger.error(e);
      throw new ControllerError('MODULE_ERROR');
    }

    try {
      const { apiPath } = this.config;
      this.endpoints = await createRoutes(apiPath);
      await createClientApi(this.config, this.endpoints);
    } catch (e: any) {
      logger.error(e);
      throw new ControllerError('ENDPOINTS_CREATE_ERROR');
    }

    try {
      const { tasks = [] } = this.config;
      for (const task of tasks) await this.execTask(task);
    } catch (e: any) {
      logger.error(e);
      throw new ControllerError('TASK_ERROR');
    }

    this.inited = true;
    return this;
  }

  private async execTask(task: ITask) {
    const { time, interval = 0, params, path } = task;
    const operation = {
      options: {
        sessionKey: 'scheduler',
        origin: 'http://example.com',
        isAdmin: true,
      },
      names: pathToArray(path),
      data: { params },
    };
    setTimeout(() => {
      time !== undefined && this.exec(operation).catch((e) => logger.error(e));
      if (!interval) return;
      setInterval(
        () => this.exec(operation).catch((e) => logger.error(e)),
        interval,
      ).unref();
    }, time || 0).unref();
  }

  async exec(operation: IOperation): Promise<TOperationResponse> {
    if (!this.inited) throw new ControllerError('CONTROLLER_ERROR');
    const {
      options: { origin, connectionId, isAdmin },
      names,
    } = operation;
    const context = { origin, connectionId, isAdmin } as IContext;
    const handler = this.findRoute(names);
    try {
      const { data } = await this.execInputModules!(
        operation,
        context,
        handler,
      );
      const response = await handler(context, data.params);
      return await this.execOutputModules!(response, context, handler);
    } catch (e: any) {
      return errorHandler(e);
    } finally {
      await context.session.finalize();
    }
  }

  private findRoute(names: IOperation['names']): THandler {
    let handler: IEndpoints | THandler = this.endpoints!;
    for (const key of names) {
      if (!isHandler(handler) && key in handler) handler = handler[key]!;
      else throw new ControllerError('CANT_FIND_ENDPOINT');
    }
    if (isHandler(handler)) return handler;
    throw new ControllerError('CANT_FIND_ENDPOINT');
  }
}

export = Controller;
