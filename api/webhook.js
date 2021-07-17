// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = "test";

const TelegramBot = require("node-telegram-bot-api");

module.exports = async (request, response) => {
  const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
  try {
    const { body } = request;
    if (body.message) {
      const {
        chat: { id },
        text,
      } = body.message;
      const message = `✅ Thanks for your message: *"${text}"*\nHave a great day! 👋🏻`;
      await bot.sendMessage(id, message, { parse_mode: "Markdown" });
    }
  } catch (error) {
    // If there was an error sending our message then we
    // can log it into the Vercel console
    console.error("Error sending message");
    console.log(error.toString());
  }
  response.send("OK");
};
