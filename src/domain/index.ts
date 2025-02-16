import * as memberImport from './member/member';
import * as comUtils from './utils/utils';

export const member = { ...memberImport };
export const utils = { ...comUtils };

export type IDomain = {
  event: typeof event;
  member: typeof member;
  utils: typeof utils;
};
