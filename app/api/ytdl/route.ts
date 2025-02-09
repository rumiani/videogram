// import ytdl from "ytdl-core";
import ytdl from "@distube/ytdl-core";

import fs from "fs";
import { NextResponse } from "next/server";

export const GET = async () => {
  const videoUrl = "https://www.youtube.com/watch?v=MPL0n5Pd8Js";

  try {
    // const info = await ytdl.getInfo(videoUrl);
    const info = await ytdl.getBasicInfo(videoUrl);

    const writeStream = fs.createWriteStream("./downloaded_video.mp4");
    ytdl(videoUrl, {
      format: ytdl.chooseFormat(info.formats, { quality: "highest" }),
    }).pipe(writeStream);

    writeStream.on("finish", () => {
    });
    writeStream.on("error", () => {
    });
    return NextResponse.json("done");
  } catch {
    return NextResponse.json("Failed to download video", {});
  }
};
