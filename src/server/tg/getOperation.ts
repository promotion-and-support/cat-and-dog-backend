import { Context } from 'grammy';

const getUrlFromArg = (origin: string, token: string) => {
  const pathBase64 = token.match(/^path(.+)$/)?.[1];
  if (!pathBase64) return;
  const path = Buffer.from(pathBase64, 'base64').toString();
  return `${origin}${path}`;
};

export const getOparation = (ctx: Context, origin: string) => {
  const { chat, message, editedMessage } = ctx;
  const chatId = chat?.id.toString();
  if (!chatId) return;
  const { text } = message || editedMessage || {};
  if (!text) return;
  if (/^\/start$/.test(text)) {
    return;
  }
  const startParam = text.match(/^\/start (.+)$/)?.[1];
  if (startParam) {
    const url = getUrlFromArg(origin, startParam);

    const operation = {
      options: { sessionKey: 'messenger', origin: 'https://t.me' },
      names: 'account/messenger/link/connect'.split('/'),
      data: { params: { chatId, token: startParam } },
    };

    return url ? { url } : { operation };
  }

  const operation = {
    options: { sessionKey: 'messenger', origin: 'https://t.me', isAdmin: true },
    names: 'bot/message'.split('/'),
    data: {
      params: {
        chatId,
        message: (message || editedMessage) as unknown as Record<
          string,
          string
        >,
      },
    },
  };

  return { operation };
};
