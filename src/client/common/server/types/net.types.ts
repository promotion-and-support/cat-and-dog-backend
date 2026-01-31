import {
  ITableMembers,
  ITableMembersToMembers,
  INet,
  ITableNets,
  ITableNetsData,
  ITableNodes,
  ITableNetsGuests,
  ITableUsers,
  OuterJoin,
} from '../../../local/imports';
import { IMemberResponse, IUserNode } from './member.types';

export type INetCreateParams = Pick<ITableNetsData, 'name'> & {
  node_id: number | null;
};

export type INetEnterParams = { net_id: number };

export type INetUpdateParams = IUserNode & { goal: string };

export type INetResponse = (ITableNets & ITableNetsData & ITableNodes) | null;

export type INetsResponse = (ITableNets &
  Pick<ITableNetsData, 'name'> &
  Pick<ITableNodes, 'node_id' | 'parent_node_id'>)[];

export type INetViewResponse = IMemberResponse[];
export const NET_VIEW_MAP = ['net', 'tree', 'circle'] as const;
export type NetViewKeys = (typeof NET_VIEW_MAP)[number];
export type NetViewEnum = Exclude<NetViewKeys, 'net'>;

export type IUserNetDataResponse = Pick<
  ITableNodes,
  'node_id' | 'parent_node_id' | 'count_of_members'
> &
  Pick<ITableMembers, 'confirmed'> &
  OuterJoin<Pick<ITableMembersToMembers, 'vote'>> & { vote_count: number };

export type INetConnectByToken = {
  net_id: number;
  error?: 'already member or connected' | 'not parent net member';
} | null;

export type INetConnectByLink = {
  net_id: number;
  error?:
    | 'already waiting'
    | 'already member or connected'
    | 'not parent net member';
} | null;

export type IWaitCreateParams = {
  token: string;
  comment: string;
  test: boolean;
};

export type IWaitNets = Pick<INet, 'net_id' | 'name'>[];

export type INetWaiting = Pick<ITableUsers, 'user_id' | 'name' | 'chat_id'> &
  Pick<ITableNetsGuests, 'comment'>;
export type INetWaitingResponse = INetWaiting[];

export type INetInviteParams = {
  node_id: number;
  user_id: number;
};
