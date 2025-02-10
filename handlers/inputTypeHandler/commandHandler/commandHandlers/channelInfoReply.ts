import { formatNumHandler } from "@/handlers/formatNumbers/formatNumbers";
import channelInfoHandler from "@/handlers/videoHandler/channelHandler/channelInfoHandler";
import _ from "lodash";

export default async function channelInfoReply(commandArray: string[]) {
  if (commandArray.length === 2) {
    const username = commandArray[1];
    const channelInfo = await channelInfoHandler(username);
    if (channelInfo) {
      return `
        ${_.capitalize(username)}\nViews: ${formatNumHandler(
        channelInfo.statistics.viewCount
      )}\nSubscribers: ${formatNumHandler(
        channelInfo.statistics.subscriberCount
      )}`;
    } else {
      return "Channel not found or API error.";
    }
  } else {
    return "Invalid input => /help";
  }
}
