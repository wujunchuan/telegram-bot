// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = "test";

import TelegramBot from "node-telegram-bot-api";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { parseCostflow } from "../lib/cosflow";
import { appendToBeancountContent } from "../lib/octo";

const AUTHED_ACCOUNT = "goh_john_trump";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (!process.env.TELEGRAM_TOKEN) throw new Error("TELEGRAM_TOKEN Undefined.");

  const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
  try {
    const { body } = request;
    const { message } = body;
    if (message) {
      const {
        chat: { id, username },
        message_id,
        text = "",
      } = message as TelegramBot.Message;

      /* 简单的鉴权 */
      if (AUTHED_ACCOUNT !== username) {
        await bot.sendMessage(id, "滚犊子", {
          reply_to_message_id: message_id
        });
        throw new Error("非本人调用");
      };

      /* 解析成 Beancount 语法 */
      try {
        const output = await parseCostflow(text);
        const isSkip = output.startsWith(';');
        if (!isSkip) {
          // 非注释，存入
          await appendToBeancountContent(output!, text);
        }
        await bot.sendMessage(id, `${isSkip ? '跳过存储: ' + output : output!}`, { reply_to_message_id: message_id });
      } catch (e) {
        bot.sendMessage(id, `解析错误：${e.message}`, {
          reply_to_message_id: message_id,
        });
      }

    }
  } catch (error) {
    // If there was an error sending our message then we
    // can log it into the Vercel console
    console.error(error.toString());
  }
  response.send("祖宗之法不可变，五瓦为体，快充为用");
};
