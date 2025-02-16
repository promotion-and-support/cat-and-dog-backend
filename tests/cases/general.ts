import { ITestUnitsMap } from '../types/test.units.types';
import { ITestCase } from '../types/types';

export const generalCases = (units: ITestUnitsMap): ITestCase[] => [
  {
    title: 'Test API over HTTP',
    dbDataFile: 'restore.sh',
    connection: 'http',
    caseUnits: [
      [units.account.login.user(2), 0],
      [units.account.login.user(3), 1],
    ],
  },
  {
    title: 'Test API over WS',
    dbDataFile: 'restore.sh',
    connection: 'ws',
    caseUnits: [
      [units.account.login.user(2), 0],
      [units.account.login.user(3), 1],
    ],
  },
  {
    title: 'Test API over LINK',
    dbDataFile: 'restore.sh',
    connection: 'link',
    caseUnits: [
      [units.account.login.user(2), 0],
      [units.account.login.user(3), 1],
    ],
  },
];
