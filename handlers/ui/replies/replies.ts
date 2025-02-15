import { bot } from "@/app/bot";
import { keyboardBuilder } from "../keyboardBuilder/keyboardBuilder";
import { addUser } from "@/handlers/user/addUser/addUser";
import commands from "@/handlers/commands/commands";
import { menuKeyboardData } from "@/data/keyboardObjects";
import { MyContext } from "@/app/types/telegram";
import { addChannel } from "@/handlers/user/addChnnel/addChnnel";
import { formatNumHandler } from "@/handlers/formatNumbers/formatNumbers";

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
    if (ctx.from?.is_bot) return;
    if (!ctx.message?.text) return ctx.reply("Bad request, click /help");
    ctx.session.step = ""; // Reset state after receiving input
    const addChannelResponse = await addChannel(ctx);

    if (addChannelResponse) {
      if (addChannelResponse?.isNewChannel) {
        return await ctx.reply(
          `YouTube channel has been saved and you will be notified when getting new subscribers.\ncurrent subscribers: ${formatNumHandler(
            addChannelResponse.subs
          )}`
        );
      } else {
        return await ctx.reply(
          `YouTube channel already exist and you will be notified when getting new subscribers.\ncurrent subscribers: ${formatNumHandler(
            addChannelResponse.subs
          )}`
        );
      }
    } else {
      return await ctx.reply(
        `Wrong url!\nPlease enter a valid Youtube channel url.`
      );
    }
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
