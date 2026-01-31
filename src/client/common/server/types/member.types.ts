import {
  ITableUsers,
  ITableMembersInvites,
  ITableMembersToMembers,
  ITableMembers,
  ITableNodes,
  OuterJoin,
} from '../../../local/imports';

export type IUserNode = {
  node_id: number;
};

export type IMemberNode = {
  member_id: number;
};

export type IMemberConfirmParams = IUserNode & IMemberNode;
export type IMemberInviteParams = IMemberConfirmParams & {
  member_name: string;
};

export type IMemberResponse = Pick<
  ITableNodes,
  'node_id' | 'count_of_members'
> &
  OuterJoin<Pick<ITableMembers, 'user_id' | 'confirmed'>> &
  OuterJoin<Pick<ITableUsers, 'name'>> &
  OuterJoin<Pick<ITableMembersInvites, 'token' | 'member_name'>> &
  OuterJoin<Pick<ITableMembersToMembers, 'dislike' | 'vote'>> & {
    vote_count: number;
  };
