import { formatNumHandler } from "@/handlers/formatNumbers/formatNumbers";
import channelInfoHandler from "@/handlers/videoHandler/channelHandler/channelInfoHandler";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { webhookCallback } from "grammy";
import { bot } from "@/app/bot";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const POST = async (req: Request) => {
  const headers = req.headers;
  const userAgent = headers.get("user-agent");
  const isCronJob = userAgent && userAgent.includes("cron-job.org");
  try {
    if (isCronJob) {
      const allChannels = await prisma.channel.findMany({
        include: { user: true },
      });
      for (const channel of allChannels) {
        const userChannelInfo = await channelInfoHandler(channel.channelId);
        const currentYoutubeSubs = +userChannelInfo.statistics.subscriberCount;
        console.log(currentYoutubeSubs, channel.subscriberCount);

        if (currentYoutubeSubs > channel.subscriberCount) {
          bot.api.sendMessage(
            channel.user.telegramId,
            `🎉🎉🎉 
            You have got ${
              currentYoutubeSubs - channel.subscriberCount
            } new subscribers
            Now you have ${formatNumHandler(currentYoutubeSubs)} subscribers`
          );

          await prisma.channel.update({
            where: { channelId: channel.channelId },
            data: {
              subscriberCount: currentYoutubeSubs,
            },
          });
        }
      }
      return NextResponse.json("Request from cronjob processed.", {
        status: 200,
      });
    } else {
      return webhookCallback(bot, "std/http")(req);
    }
  } catch (e) {
    console.log(e);

    return NextResponse.json("Server error.", { status: 500 });
  }
};
