import { Store } from '@lib/store/store';
import { FirstService } from './services/first.service';

export interface IAppBase {
  firstService: FirstService;
};

export class AppBase extends Store implements IAppBase {
  firstService: FirstService = new FirstService({ value: 'Hello, World!', }, this);

  constructor() {
    super({}, undefined, 'INIT');
  }
  
  async init() {
    await this.firstService.init();
    this.setState({ status: 'READY' });
  }
}
