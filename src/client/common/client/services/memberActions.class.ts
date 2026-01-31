import * as T from '../../server/types/types';
import { Store } from '../lib/store/store';
import { App } from '../app';
import { Net } from './net.service';

export class MemberActions extends Store {
  constructor(
    private app: App,
    private net: Net,
  ) {
    super({});
  }

  getName(netView: T.NetViewEnum, member: T.IMemberResponse, memberPosition: number) {
    const position = netView === 'tree' ? memberPosition + 1 : memberPosition && memberPosition + 1;
    const { name, member_name: memberName } = member;
    return name || memberName || `Учасник ${position}`;
  }

  async setDislike(member_id: number) {
    try {
      const { userNet: net } = this.app.getState();
      const success = await this.app.api.member.data.dislike.set({
        ...net!,
        member_id,
      });
      success && (await this.net.onMemberChanged());
      return success;
    } catch (e: any) {
      this.setError(e);
    }
  }

  async unsetDislike(member_id: number) {
    try {
      const { userNet: net } = this.app.getState();
      const success = await this.app.api.member.data.dislike.unSet({
        ...net!,
        member_id,
      });
      success && (await this.net.onMemberChanged());
      return success;
    } catch (e: any) {
      this.setError(e);
    }
  }

  async setVote(member_id: number) {
    try {
      const { userNet: net } = this.app.getState();
      const voted = await this.app.api.member.data.vote.set({
        ...net!,
        member_id,
      });
      if (voted === false) {
        await this.net.onMemberChanged();
        await this.net.onUserNetDataChanged();
      }
      return voted !== null;
    } catch (e: any) {
      this.setError(e);
    }
  }

  async unsetVote(member_id: number) {
    try {
      const { userNet: net } = this.app.getState();
      const success = await this.app.api.member.data.vote.unSet({
        ...net!,
        member_id,
      });
      if (success) {
        if (member_id === net?.node_id) await this.net.onUserNetDataChanged();
        else await this.net.onMemberChanged();
      }
      return success;
    } catch (e: any) {
      this.setError(e);
    }
  }
}
