export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import { replies } from "@/handlers/ui/replies/replies";
import { Bot, session } from "grammy";
import { MyContext } from "../types/telegram";

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token)
  throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");

export const bot = new Bot<MyContext>(token!);
bot.use(session({ initial: () => ({ step: "" }) }));

bot.command("start", replies.startReply);
bot.command("menu", replies.menuReply);

bot.on("callback_query:data", async (ctx) => {
  const { message, data } = ctx.callbackQuery;
  if (message) await ctx.deleteMessage();

  const [action, value] = data.split("_");

  switch (action) {
    case "channel":
      switch (value) {
        case "youtube":
          ctx.session.step = "awaiting_channel"; // Set state to expect input
          await ctx.reply("Please enter your YouTube channel's URL:");
      }
      break;

    default:
      return ctx.reply("default reply");
  }

  ctx.answerCallbackQuery();
});

bot.on("message:text", async (ctx) => replies.messageTextReply(ctx));

