import { formatNumHandler } from "@/handlers/formatNumbers/formatNumbers";
import channelInfoHandler from "@/handlers/videoHandler/channelHandler/channelInfoHandler";
import _ from "lodash";

export default async function videoInfoReply(commandArray: string[]) {
  if (commandArray.length === 2) {
    const username = commandArray[1];
    const data = await channelInfoHandler(username);
    if (data.items && data.items.length > 0) {
      const channel = data.items[0];
      return `
        ${_.capitalize(username)}\nViews: ${formatNumHandler(
        channel.statistics.viewCount
      )}\nSubscribers: ${formatNumHandler(channel.statistics.subscriberCount)}`;
    } else {
      return "Channel not found or API error.";
    }
  } else {
    return "Invalid input => /help";
  }
}
