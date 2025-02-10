import prisma from "@/lib/prisma";
import { userInfo } from "../userInfo/userInfo";
import { MyContext } from "@/app/types/telegram";

export async function addUser(ctx: MyContext) {
  try {
    if (ctx.from!.is_bot)
      return { user: ctx.from!, isNewUser: false, isBot: ctx.from!.is_bot };

    const existingUser = await userInfo(ctx);

    if (existingUser)
      return { user: existingUser, isNewUser: false, isBot: ctx.from!.is_bot };

    const createdUser = await prisma.user.create({
      data: {
        name: ctx.from!.first_name || "",
        telegramId: ctx.from!.id.toString(),
        username: ctx.from!.username || "",
        languageCode: ctx.from!.language_code || "",
        status: "ACTIVE",
      },
    });
    return { user: createdUser, isNewUser: true, isBot: ctx.from!.is_bot };
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
  }
}
