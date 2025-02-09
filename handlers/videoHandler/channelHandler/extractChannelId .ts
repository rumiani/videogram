export default function extractChannelIdHandler(url: string) {
  const channelIdRegex = /(?:youtube\.com\/(?:channel\/|c\/|@))([^\/\n\s?=]+)/;
  const match = url.match(channelIdRegex);
  return match ? match[1] : null;
}
