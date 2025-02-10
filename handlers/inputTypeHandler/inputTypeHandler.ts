// import ytdl from "ytdl-core";

import linkDetector from "../linkDetector/linkDetector";
import channelInfoHandler from "../videoHandler/channelHandler/channelInfoHandler";
import { extractChannelIdHandler } from "../videoHandler/channelHandler/extractChannelId ";
// import videoDl from "../videoHandler/videoDl";
import commandHandler from "./commandHandler/commandHandler";

export default async function inputTypeHandler(messageText: string) {
  let cleanedText = messageText.trim().toLowerCase();

  if (cleanedText.includes("@trackrate_bot")) {
    cleanedText = cleanedText.replace("@trackrate_bot", "");
    if (cleanedText === "") return "Hi, how may I help you?\n /help";
  }


  if (cleanedText.startsWith("/")) return commandHandler(cleanedText);

  const { isUrl, isChannel, isVideo } = linkDetector(cleanedText);
  if (!isUrl) {
    return "Error, this is not a valid input. /menu";
  }
  if (isVideo) {
  }
  if (isChannel) {
    const channelId = await extractChannelIdHandler(cleanedText);
    return channelInfoHandler(channelId);
  }
}
