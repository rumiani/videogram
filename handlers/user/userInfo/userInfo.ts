import { MyContext } from "@/app/types/telegram";
import prisma from "@/lib/prisma";

export async function userInfo(ctx: MyContext) {
  const existingUser = await prisma.user.findUnique({
    where: {
      telegramId: ctx.from!.id.toString(),
    },
    include: { ChannelData: true, downloads: true },
  });
  return existingUser;
}
