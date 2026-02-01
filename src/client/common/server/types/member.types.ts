import {
  ITableMembersInvites,
  ITableMembersToMembers,
  ITableMembers,
  ITableNodes,
  OuterJoin,
} from '../../../local/imports';
import { IUser } from './types';

export type IUserNode = { node_id: number };

export type IMemberNode = { member_id: number };

export type IMemberConfirmParams = IUserNode & IMemberNode;

export type IMemberInviteParams = IMemberConfirmParams & {
  member_name: string;
};

export type IMember = ITableMembers & IUser;

export type IMemberResponse = ITableNodes &
  OuterJoin<IMember> &
  OuterJoin<ITableMembersInvites> &
  OuterJoin<ITableMembersToMembers> & {
    vote_count: number;
  };
