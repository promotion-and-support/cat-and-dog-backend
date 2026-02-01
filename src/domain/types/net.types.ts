import * as T from './db.types';
import { INetMember } from './member.types';

export type INet = T.ITableNets & T.ITableNetsData;

export type IUserNet = T.ITableNets &
  T.ITableNetsData &
  T.ITableNodes &
  T.ITableMembers;

/* net structure */
export type INetNode = {
  member: INetMember;
  tree: INetNode[] | null;
  // connection: boolean;
};
