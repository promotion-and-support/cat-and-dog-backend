import * as T from '../server/types/types';
import { MemberStatusKeys } from '../server/constants';

export type IMember = Omit<T.IMemberResponse, 'member_name'> & {
  member_name: string;
  memberStatus: MemberStatusKeys;
};
