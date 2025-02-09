import channelVsReply from "./commandHandlers/channelVsReply";
import channelInfoReply from "./commandHandlers/channelInfoReply";
import { currenciesComandList } from "../../../../../data/assets";

export default async function commandHandler(messageText: string) {
  type CommandHandler = (
    args: string[]
  ) =>
    | string
    | Promise<
        | string
        | {
            text: string;
            reply_markup: {
              inline_keyboard: { text: string; callback_data: string }[][];
            };
          }
      >;
  const commandReplies: Record<string, CommandHandler> = {
    "/info": (args: string[]) => channelInfoReply(args),
    "/vs": (args: string[]) => channelVsReply(args),
    "/top": () => "Fetching the top YouTube channels...",
    "/list": () => "Here are your favorite YouTube channels: ...",
    "/help": () =>
      `Available commands:\n/menu \n/Currencies\nContact the developer: @rumimaz`,
    "/currencies":() => `Currencies List:\n${currenciesComandList}`
  };
  const commandArray = messageText.split(" ").filter((item) => item.trim() !== "");
  const handler = commandReplies[commandArray[0]];
  if (handler) {
    return await handler(commandArray);
  } else {
    return await channelInfoReply(["/info", messageText]);
  }
}
