// @ts-nocheck
import * as P from './types';

export type TAccountLogin_tg = {
  initData: string;
};
export type TAccountSignup_tg = {
  initData: string;
};
export type TEventsRead = {
  event_id?: number;
};
export type TEventsConfirm = {
  event_id: number;
};
export type TMemberDataVoteSetResponse = boolean | null;
export type TMemberInviteCreateResponse = string | null;
export type TNetInvite = {
  node_id: number;
  user_id: number;
};
export type TNetInviteResponse = string | null;
export type TSubscriptionRemove = {
  subject: string | null;
};
