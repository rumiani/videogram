// import usersForYoutube from "@/data/usersForYoutube";
// import { formatNumHandler } from "@/handlers/formatNumbers/formatNumbers";
// import channelInfoHandler from "@/handlers/videoHandler/channelHandler/channelInfoHandler";
// import prisma from "@/lib/prisma";
import { Bot, webhookCallback } from "grammy";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token)
  throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");

const bot = new Bot(token);

bot.command("start", (ctx) => ctx.reply("start"));
bot.command("menu", (ctx) => ctx.reply("menu"));

bot.on("message:text", async (ctx) => ctx.reply("text message"));

export const POST = async (req: Request) => {
  const headers = req.headers;
  const userAgent = headers.get("user-agent");
  const isCronJob = userAgent && userAgent.includes("cron-job.org");
  try {
    if (isCronJob) {
      // for (const user of usersForYoutube) {
      //   const userChannelInfo = await channelInfoHandler(user.youtube_username);
      //   const youtubeSubs = +userChannelInfo.statistics.subscriberCount;
      //   const storedUser = await prisma.users.findFirst({
      //     where: { telegram_id: user.telegram_id.toString() },
      //   });

      //   if (storedUser && youtubeSubs > storedUser?.subs) {
      //     bot.api.sendMessage(
      //       user.telegram_id,
      //       `You have got ${
      //         youtubeSubs - +storedUser.subs
      //       } new subscribers 🎉🎉🎉 \nNow you have ${formatNumHandler(
      //         youtubeSubs
      //       )} subscribers`
      //     );
      //     bot.api.sendMessage(1028887352, storedUser?.subs.toString());

      //     await prisma.users.update({
      //       where: { telegram_id: user.telegram_id.toString() },
      //       data: {
      //         subs: youtubeSubs,
      //       },
      //     });
      //   }
      // }
      // return NextResponse.json("Request from cronjob processed.", {
      //   status: 200,
      // });
    } else {
      return webhookCallback(bot, "std/http")(req);
    }
  } catch {
    return NextResponse.json("Server error.", { status: 500 });
  }
};
