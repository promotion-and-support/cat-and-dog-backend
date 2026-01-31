import * as T from '../../server/types/types';
import { IMember } from '../types';
import { Store } from '../lib/store/store';
import { App } from '../app';
import { Net } from './net.service';

export class Member extends Store {
  constructor(
    private member: IMember,
    private app: App,
    private net: Net,
  ) {
    super({});
  }

  getMember() {
    return this.member;
  }

  async createInvite(args: Pick<T.IMemberInviteParams, 'member_name'>) {
    try {
      const { userNet: net } = this.net.state;
      const token = await this.app.api.member.invite.create({
        ...args,
        member_id: this.member.node_id,
        ...net!,
      });
      if (token) await this.net.onMemberChanged();
      return token;
    } catch (e: any) {
      this.setError(e);
    }
  }

  async inviteCancel() {
    try {
      const { userNet: net } = this.app.getState();
      const success = await this.app.api.member.invite.cancel({
        member_id: this.member.node_id,
        ...net!,
      });
      if (success) await this.net.onMemberChanged();
      return success;
    } catch (e: any) {
      this.setError(e);
    }
  }

  async inviteConfirm() {
    try {
      const { userNet: net } = this.app.getState();
      const success = await this.app.api.member.invite.confirm({
        member_id: this.member.node_id,
        ...net!,
      });
      if (success) await this.net.onMemberChanged();
      await this.net.onNetChanged();
      return success;
    } catch (e: any) {
      this.setError(e);
      throw e;
    }
  }

  async inviteRefuse() {
    try {
      const { userNet: net } = this.app.getState();
      const success = await this.app.api.member.invite.refuse({
        member_id: this.member.node_id,
        ...net!,
      });
      if (success) await this.net.onMemberChanged();
      return success;
    } catch (e: any) {
      this.setError(e);
      throw e;
    }
  }
}
