/* eslint-disable max-len */
import { env } from 'node:process';
import { Context, InlineKeyboard } from 'grammy';

const origin = env.ORIGIN || 'https://example.com';
const contacts = new URL(origin);
contacts.pathname = '/contacts';
const help = new URL(origin);
help.pathname = '/help';

export const greeting = (ctx: Context) => {
  if (env.DEV === 'true') {
    const btns = [[{ text: origin, web_app: { url: origin } }]];
    const inlineKyeboard = new InlineKeyboard(btns);
    return ctx.reply('OPEN UI', { reply_markup: inlineKyeboard });
  }

  //   const text = `
  // Цей інструмент створено для бажаючих допомагати притулку.
  // Ви зможете отримувати повідомлення про поточний стан справ та потреби.
  // Щоб обрати зручний варіант підписки - натисність <b>OPEN</b>.
  // `;

  const text = `
Цей інструмент створено для спільноти, мета якої:

'Створити всі необхідні умови та можливості для творчості кожної особистості'.

Ви зможете отримувати повідомлення про поточний стан справ та потреби.

Щоб обрати зручний варіант підписки - натисність <b>OPEN</b>.
`;

  return ctx.reply(text, { parse_mode: 'HTML' });
};

export const forbidden = (ctx: Context) => {
  const btns = [
    [{ text: 'КОНТАКТИ', web_app: { url: contacts.href } }],
    [{ text: 'ДОВІДКА', web_app: { url: help.href } }],
  ];
  const inlineKyeboard = new InlineKeyboard(btns);
  return ctx.reply(
    `
Ви не можете відправляти повідомлення.
Якщо у Вас запитання по користуванню ботом - подивіться Довідку.
При потребі поспілкуватись з адміном - подивіться Контакти.
`,
    { reply_markup: inlineKyeboard },
  );
};
