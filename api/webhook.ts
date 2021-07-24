// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = "test";

import TelegramBot from "node-telegram-bot-api";
import { VercelRequest, VercelResponse } from "@vercel/node";
import costflow from "costflow";
import { NParseResult } from "costflow/lib/interface";

const config = {
  mode: "beancount" as const,
  currency: "CNY",
  timezone: "Asia/Hong_Kong",
  account: {
    信用卡: "Liabilities:CreditCard:CMB",
    捐赠: "Expenses:Blog:Donate",
  },
};

export default async (request: VercelRequest, response: VercelResponse) => {
  if (!process.env.TELEGRAM_TOKEN) throw new Error("TELEGRAM_TOKEN Undefined.");

  const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
  try {
    const { body } = request;
    const { message } = body;
    if (message) {
      const {
        chat: { id },
        message_id,
        text = "",
      } = message as TelegramBot.Message;

      try {
        const { output } = await costflow.parse(text, config) as NParseResult.Result;
        await bot.sendMessage(id, output!, { reply_to_message_id: message_id });
      } catch (e) {
        bot.sendMessage(id, e.message, {
          reply_to_message_id: message_id,
        });
      }
    }
  } catch (error) {
    // If there was an error sending our message then we
    // can log it into the Vercel console
    console.error("Error sending message");
    console.log(error.toString());
  }
  response.send("祖宗之法不可变，五瓦为体，快充为用");
};
