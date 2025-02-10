import prisma from "@/lib/prisma";
import { MyContext } from "@/app/types/telegram";
import { userInfo } from "../userInfo/userInfo";
import { extractChannelIdHandler } from "@/handlers/videoHandler/channelHandler/extractChannelId ";
import channelInfoHandler from "@/handlers/videoHandler/channelHandler/channelInfoHandler";

export async function addChannel(ctx: MyContext) {
  try {
    if (ctx.from!.is_bot) return null;

    const existingUser = await userInfo(ctx);
    if (!existingUser) return null;
    const channelId = ctx.message!.text
      ? await extractChannelIdHandler(ctx.message!.text)
      : null;

    const storedChannel = existingUser!.ChannelData.find(
      (channel) => channel.channelId === channelId
    );
    if (storedChannel) return { channel: storedChannel, isNewChannel: false };
    if (!channelId)
      return {
        channel: storedChannel,
        isNewChannel: false,
        message: "Wront url",
      };
    const channelInfo = await channelInfoHandler(channelId);
    const { viewCount, subscriberCount, videoCount } = channelInfo.statistics;
    const createdChannel = await prisma.channel.create({
      data: {
        userId: existingUser!.id || "",
        channelId: channelId,
        title: "",
        subscriberCount: +subscriberCount,
        videoCount: +videoCount,
        viewCount: +viewCount,
      },
    });

    return { channel: createdChannel, isNewChannel: true };
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
  }
}
