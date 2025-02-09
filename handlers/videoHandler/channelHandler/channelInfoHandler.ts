import usernameToId from "./usernameToId";
export default async function channelInfoHandler(username: string | null) {
  if (!username) return "Channel not found or API error.";
  try {
    const channelId = await usernameToId(username);
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const channelInfo = data.items[0];
      return channelInfo;
    }
  } catch (error) {
    console.log(error);
  }
}
