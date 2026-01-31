import { Readable } from 'node:stream';
import * as T from '../../client/common/server/types/types';
import { IServices } from '../../controller/types';
import { IConnectionService } from '../../server/types';
import { ChatService } from '../chat/chat';
import { ITableMessages, ITableUsers } from '../../domain/types/db.types';
import { IMeesageStream } from './notifications.types';

type IInstantEvent = Omit<T.IEventMessage, 'type' | 'event_id' | 'date'>;

export class NotificationService {
  private connection: IConnectionService;
  private tg: IConnectionService;
  private chat: ChatService;
  private tgInterval: number;
  private emailInterval: number;
  private messageStream: Readable & AsyncIterable<IMeesageStream>;
  private tgStream1: Readable &
    AsyncIterable<{
      user: ITableUsers;
      message?: string;
      other?: Record<string, any>;
    }>;
  private tgStream: Readable &
    AsyncIterable<{ user: ITableUsers; message: ITableMessages }>;
  private mailStream: Readable & AsyncIterable<ITableUsers>;

  constructor(services: IServices) {
    const { chatService } = services;
    this.connection = connectionService;
    this.tg = messengerService;
    this.chat = chatService!;
    this.tgInterval = Number(env.NOTIFICATION_INTERVAL);
    this.emailInterval = Number(env.NOTIFICATION_INTERVAL);
    this.messageStream = new Readable({ read: () => true, objectMode: true });
    this.tgStream1 = new Readable({ read: () => true, objectMode: true });
    this.tgStream = new Readable({ read: () => true, objectMode: true });

    this.mailStream = new Readable({ read: () => true, objectMode: true });
    this.sendingToClient();
    this.sendingToTelegram1();
    this.sendingToTelegram();
    this.sendingToEmail();
  }

  private async sendingToClient() {
    for await (const data of this.messageStream) {
      const { user_id, connectionIds, message } = data;
      // logger.warn('SEND TO CLIENT', { user_id, net_id });
      const success = await this.connection.sendMessage(message, connectionIds);
      if (success) continue;
      logger.warn("CANT'T SEND TO CLIENT", user_id);
      let userId = user_id;
      if (!user_id) {
        const [connection] = connectionIds;
        userId = this.chat.getConnectionUser(connection!);
        if (!userId) {
          logger.warn('Cant find user by connection', connection);
          continue;
        }
      }
      this.sendToTgOrEmail(userId!).catch(logger.error.bind(logger));
    }
  }

  private async sendingToTelegram1() {
    for await (const { user, message, other } of this.tgStream1) {
      const { user_id, chat_id } = user;
      // logger.warn('SEND TO TELEGRAM', user_id);
      const date = new Date().toUTCString();
      const success = await this.tg!.sendNotification(chat_id!, message, other);
      if (success) {
        await execQuery.user.events
          .write([user_id, date])
          .catch(logger.error.bind(logger));
      } else {
        logger.warn("CANT'T SEND TO TELEGRAM", user_id);
        // this.sendToEmail(user).catch(logger.error.bind(logger));
      }
    }
  }

  private async sendingToTelegram() {
    for await (const { user, message } of this.tgStream) {
      const { user_id, chat_id } = user;
      const { subject, content, date: message_date } = message;

      if (!content) {
        continue;
      }

      // logger.warn('SEND TO TELEGRAM', user, content);
      const success = await this.tg!.sendNotification(chat_id!, content);

      if (success) {
        if (!user_id) {
          continue;
        }
        await execQuery.subscription.send
          .register([subject, user_id, message_date])
          .catch(logger.error.bind(logger));
      } else {
        logger.warn("CANT'T SEND TO TELEGRAM", user_id);
      }
    }
  }

  sendForUsers(users: ITableUsers[], message: ITableMessages) {
    for (const user of users) {
      this.tgStream.push({ user, message });
    }
  }

  private async sendingToEmail() {
    for await (const user of this.mailStream) {
      const { user_id, email } = user;
      // logger.warn('SEND TO EMAIL', user_id, email);
      const date = new Date().toUTCString();
      let success = false;
      if (!(env.TEST || env.DEV)) {
        success = await mailService.notify(email!);
      } else {
        success = true;
      }
      if (success) {
        await execQuery.user.events
          .write([user_id, date])
          .catch(logger.error.bind(logger));
      } else {
        logger.warn("CAN'T SEND TO EMAIL", user_id, email);
      }
    }
  }

  async sendEventOrNotif(user_id: number, messageText: string) {
    const connectionIds = this.chat.getUserConnections(user_id);
    if (connectionIds) {
      const message: T.INewEventsMessage = {
        type: 'NEW_EVENTS',
      };
      this.messageStream.push({ user_id, connectionIds, message });
    }
    this.sendToTgOrEmail(user_id, messageText).catch(logger.error.bind(logger));
  }

  private async sendToTgOrEmail(user_id: number, message?: string) {
    const [user] = await execQuery.user.get([user_id]);
    const { chat_id } = user!;
    if (chat_id) this.sendToTelegram(user!, message);
    else this.sendToEmail(user!);
  }

  async sendToTelegram(
    user: Pick<ITableUsers, 'user_id' | 'chat_id'>,
    message?: string,
    other?: Record<string, any>,
  ) {
    // const [userEvents] = await execQuery.user.events.get([user.user_id]);
    // const prevNotifDateStr = userEvents?.notification_date || 0;
    // const prevNotifDate = new Date(prevNotifDateStr).getTime();
    // const curDate = new Date().getTime();
    // if (prevNotifDate < curDate - this.tgInterval) return;
    this.tgStream1.push({ user, message, other });
  }

  private async sendToEmail(user: ITableUsers) {
    const [userEvents] = await execQuery.user.events.get([user.user_id]);
    const prevNotifDateStr = userEvents?.notification_date || 0;
    const prevNotifDate = new Date(prevNotifDateStr).getTime();
    const curDate = new Date().getTime();
    if (prevNotifDate < curDate - this.emailInterval) return;
    this.mailStream.push(user);
  }

  sendNetEventOrNotif(
    net_id: number,
    from_node_id: number | null,
    message: string,
  ) {
    this.sendNetEventOrNotifToTg(net_id, from_node_id, message).catch(
      logger.error.bind(logger),
    );
    // this.sendNetEventOrNotifToEmail(net_id, from_node_id).catch(
    //   logger.error.bind(logger),
    // );
  }

  async sendNetEventOrNotifToTg(
    net_id: number,
    from_node_id: number | null,
    messageText: string,
  ) {
    // const prevNotifDate = new Date().getTime() - this.tgInterval;
    // const prevNotifDateStr = new Date(prevNotifDate).toUTCString();
    const users = await execQuery.net.users.toNotifyOnTg([
      net_id,
      from_node_id,
      // prevNotifDateStr,
      new Date().toUTCString(),
    ]);

    const message: T.INewEventsMessage = { type: 'NEW_EVENTS' };
    for (const user of users) {
      const { user_id } = user!;
      const connectionIds = this.chat.getUserConnections(user_id);
      if (connectionIds) {
        this.messageStream.push({ user_id, connectionIds, message });
      }
      this.tgStream1.push({ user, message: messageText });
    }
  }

  async sendNetEventOrNotifToEmail(
    net_id: number,
    from_node_id: number | null,
  ) {
    const prevNotifDate = new Date().getTime() - this.emailInterval;
    const prevNotifDateStr = new Date(prevNotifDate).toUTCString();
    const users = await execQuery.net.users.toNotifyOnEmail([
      net_id,
      from_node_id,
      prevNotifDateStr,
    ]);

    const message: T.INewEventsMessage = { type: 'NEW_EVENTS' };
    for (const user of users) {
      const { user_id } = user!;
      const connectionIds = this.chat.getUserConnections(user_id);
      if (connectionIds) {
        this.messageStream.push({ user_id, connectionIds, message });
      }
      this.mailStream.push(user);
    }
  }

  async sendEvent(event: IInstantEvent) {
    const { user_id, net_id } = event;
    let connectionIds: Set<number> | undefined;
    if (user_id) {
      // for user
      connectionIds = this.chat.getUserConnections(user_id);
    } else if (net_id) {
      // for users in net
      // connectionIds = chatService.getNetConnections(net_id);
    }
    if (!connectionIds) return;

    const message: T.IEventMessage = {
      type: 'EVENT',
      event_id: 0,
      date: '',
      ...event,
    };
    this.messageStream.push({ user_id, net_id, connectionIds, message });
  }
}

export default (config: unknown, services: IServices) =>
  new NotificationService(services);
