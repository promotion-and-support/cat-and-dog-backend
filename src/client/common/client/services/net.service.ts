import * as T from '../../server/types/types';
import { IMember } from '../types';
import { HttpResponseError } from '../connection/errors';
import { getMemberStatus } from '../../server/utils';
import { Store } from '../lib/store/store';
import { IApp } from '../app';

interface NetState {
  userNet: T.INetResponse;
  userNetData: T.IUserNetDataResponse | null;
  circle: IMember[];
  tree: IMember[];
  netView?: T.NetViewEnum;
}

const INITIAL_STATE: NetState = {
  userNet: null,
  userNetData: null,
  circle: [],
  tree: [],
};

export class Net extends Store<NetState> {
  constructor(private app: IApp) {
    super(INITIAL_STATE);
  }

  // async onNetChanged() {
  //   this.enter(this.userNet!.net_id, true);
  // }

  // async onMemberChanged() {
  //   if (this.netView === 'tree') await this.getTree();
  //   else await this.getCircle();
  //   if (this.member) this.findMember(this.member.getMember().node_id);
  // }

  // async onUserNetDataChanged() {
  //   await this.getUserData(true);
  //   if (this.netView === 'tree') this.app.emit('tree', { ...this.tree });
  //   else this.app.emit('circle', { ...this.circle });
  // }

  findMember(nodeId: number) {
    const { netView } = this.state;
    const { [netView!]: netViewData } = this.state;
    const memberPosition = netViewData.findIndex((item) => item.node_id === nodeId);
    const member = netViewData[memberPosition];
    if (!member) this.setError(new HttpResponseError(404));
  }

  private async setNet(userNet: T.INetResponse = null) {
    if (this.$state.userNet === userNet) return;
    this.$state.userNet = userNet;
    if (userNet) {
      await this.getUserData();
      await this.getCircle();
      await this.getTree();
    } else {
      this.setUserNetData();
      this.setCircle();
      this.setTree();
      this.setView();
    }
    // await this.app.onNewNet();
    this.setState({});
  }

  private setUserNetData(userNetData: T.IUserNetDataResponse | null = null) {
    if (this.$state.userNetData === userNetData) return;
    this.$state.userNetData = userNetData;
  }

  setView(netView?: T.NetViewEnum) {
    this.setState({ netView });
  }

  private setCircle(circle: IMember[] = []) {
    if (this.$state.circle === circle) return;
    this.setState({ circle });
  }

  private setTree(tree: IMember[] = []) {
    if (this.$state.tree === tree) return;
    this.setState({ tree });
  }

  async enter(net_id: number) {
    try {
      const net = await this.app.api.net.enter({ net_id });
      await this.setNet(net);
      return net;
    } catch (e: any) {
      await this.setNet();
      this.setError(e);
      return null;
    }
  }

  async getUserData() {
    try {
      const { net_id } = this.$state.userNet!;
      const userNetData = await this.app.api.user.net.getData({ net_id });
      this.setUserNetData(userNetData);
      return userNetData;
    } catch (e: any) {
      this.setUserNetData();
      this.setError(e);
    }
  }

  async comeout() {
    try {
      await this.setNet();
      return true;
    } catch (e: any) {
      this.setError(e);
    }
  }

  async leave() {
    try {
      const net = this.$state.userNet;
      const success = await this.app.api.net.leave(net!);
      if (success) {
        await this.setNet();
      }
      return success;
    } catch (e: any) {
      this.setError(e);
    }
  }

  async getCircle() {
    const net = this.$state.userNet;
    const result = await this.app.api.net.getCircle(net!);
    const circle: IMember[] = result.map((member, memberPosition) => {
      const memberStatus = getMemberStatus(member);
      const memberName = this.getName('circle', member, memberPosition);
      return { ...member, member_name: memberName, memberStatus };
    });
    this.setCircle(circle);
  }

  async getTree() {
    const net = this.$state.userNet;
    const result = await this.app.api.net.getTree(net!);
    const tree: IMember[] = result.map((member, memberPosition) => {
      const memberStatus = getMemberStatus(member);
      const memberName = this.getName('tree', member, memberPosition);
      return { ...member, member_name: memberName, memberStatus };
    });
    this.setTree(tree);
  }

  async getNetWaiting() {
    try {
      const { node_id } = this.$state.userNet || {};
      if (!node_id) throw new Error('Net is not defined');
      const result = await this.app.api.net.wait.get({ node_id });
      return result;
    } catch (e: any) {
      this.setError(e);
      throw e;
    }
  }

  // from memberActions
  private getName(netView: T.NetViewEnum, member: T.IMemberResponse, memberPosition: number) {
    const position = netView === 'tree' ? memberPosition + 1 : memberPosition && memberPosition + 1;
    const { name, member_name: memberName } = member;
    return name || memberName || `Учасник ${position}`;
  }
}
