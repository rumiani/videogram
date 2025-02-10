import { bot } from "@/app/bot/index";
import { keyboardBuilder } from "../keyboardBuilder/keyboardBuilder";
import { addUser } from "@/handlers/user/addUser/addUser";
import commands from "@/handlers/commands/commands";
import { menuKeyboardData } from "@/data/keyboardObjects";
import { MyContext } from "@/app/types/telegram";
import { addChannel } from "@/handlers/user/addChnnel/addChnnel";

const startReply = async (ctx: MyContext) => {
  const adminId = +process.env.TELEGRAM_ADMIN_ID!;
  const addUserResponse = await addUser(ctx);
  const welcomeMessage = `🤖: Hi ${ctx.from?.first_name}\nWelcome to the bot! 🎉\nExplore the features using /menu\nGet assistance with /help`;
  ctx.reply(welcomeMessage);
  const userName = ctx.from?.username
    ? "Username: @" + ctx.from?.username
    : "No username";
  if (addUserResponse?.isBot)
    return bot.api.sendMessage(adminId!, "bot tried to join" + ctx.from?.id);
  const newUserToMe = `#new_user \n Name: ${ctx.from?.first_name} \n Telegram_id: ${ctx.from?.id}\n ${userName}`;
  if (addUserResponse?.isNewUser) bot.api.sendMessage(adminId!, newUserToMe);
};

const menuReply = async (ctx: MyContext) => {
  ctx.reply(`Please choose an option from the list:`, {
    reply_markup: keyboardBuilder(menuKeyboardData, 2),
  });
};

const messageTextReply = async (ctx: MyContext) => {
  if (ctx.session.step === "awaiting_channel" && ctx.message!.text) {
    if (!ctx.message) return ctx.reply("Bad request, click /help");
    ctx.session.step = ""; // Reset state after receiving input
    const addChannelResponse = await addChannel(ctx);
    if (addChannelResponse)
      return await ctx.reply(
        `YouTube channel has been saved and you will be notified when getting new subscribers.`
      );
  } else {
    if (ctx.message!.text) {
      const cleanedText = ctx
        .message!.text.replace("@videogram_bot", "")
        .trim()
        .toLowerCase();
      if (cleanedText.startsWith("/")) {
        const result = await commands(cleanedText);
        return ctx.reply(result);
      } else ctx.reply("Bad request, click /help");
    }
  }
};

export const replies = {
  startReply,
  menuReply,
  messageTextReply,
};
