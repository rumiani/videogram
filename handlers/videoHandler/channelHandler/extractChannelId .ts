import usernameToId from "./usernameToId";

export async function extractChannelIdHandler(url: string) {
  const usernameMatch = url.match(/(?:youtube\.com\/@)([\w-]+)/);
  if (usernameMatch) {
    const channelId = await usernameToId(usernameMatch[1]);
    return channelId;
  }

  const channelIdMatch = url.match(
    /(?:youtube\.com\/channel\/)([A-Za-z0-9_-]+)/
  );
  if (channelIdMatch) return channelIdMatch[1]; // Extracts channel ID

  return null;
}
