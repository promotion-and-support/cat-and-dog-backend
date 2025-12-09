import * as T from '../server/types/types';
import { MemberStatusKeys } from '../server/constants';

// export interface INets {
//   parentNets: T.INetsResponse;
//   siblingNets: T.INetsResponse;
//   childNets: T.INetsResponse;
// }

export interface INetEvents {
  netId: number;
  events: T.IEvents;
  childEventsCount: number;
}

// export const INITIAL_NETS = {
//   parentNets: [],
//   siblingNets: [],
//   childNets: [],
// } as INets;

export type IMember = Omit<T.IMemberResponse, 'member_name'> & {
  member_name: string;
  memberStatus: MemberStatusKeys;
};
