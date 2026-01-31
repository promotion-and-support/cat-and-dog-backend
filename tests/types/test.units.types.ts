
/* eslint-disable max-len */
import { TTestUnit } from './types';

export interface ITestUnitsMap {
  'account': {
    'login': {
      'user': (...args: any[]) => TTestUnit;
    };
    'signup': {
      'user': (...args: any[]) => TTestUnit;
    };
  };
  'user': {
    'update': {
      'all': (...args: any[]) => TTestUnit;
      'password': TTestUnit;
    };
  };
}
