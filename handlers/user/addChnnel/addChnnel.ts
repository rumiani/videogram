import prisma from "@/lib/prisma";
import { MyContext } from "@/app/types/telegram";
import { userInfo } from "../userInfo/userInfo";
import { extractChannelIdHandler } from "@/handlers/videoHandler/channelHandler/extractChannelId ";
import channelInfoHandler from "@/handlers/videoHandler/channelHandler/channelInfoHandler";

export async function addChannel(ctx: MyContext) {
  const message = ctx.message!.text;
  try {
    const existingUser = await userInfo(ctx);
    if (!existingUser) return null;

    const channelId = await extractChannelIdHandler(message!);
    const storedChannel = existingUser!.ChannelData.find(
      (channel) => channel.channelId === channelId
    );
    const existedChannel = await prisma.channel.findFirst({
      where: { channelId },
    });
    if (existedChannel) {
      return {
        channel: existedChannel,
        isNewChannel: false,
        subs: existedChannel.subscriberCount,
      };
    }
    const userChannelInfo = await channelInfoHandler(channelId);
    const subs = +userChannelInfo.statistics.subscriberCount;
    if (storedChannel)
      return { channel: storedChannel, isNewChannel: false, subs };
    if (!channelId) return null;
    const channelInfo = await channelInfoHandler(channelId);
    const { viewCount, subscriberCount, videoCount } = channelInfo.statistics;
    const createdChannel = await prisma.channel.create({
      data: {
        userId: existingUser!.id,
        channelId: channelId,
        title: "",
        subscriberCount: +subscriberCount,
        videoCount: +videoCount,
        viewCount: +viewCount,
      },
    });

    return { channel: createdChannel, isNewChannel: true, subs };
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
  }
}
