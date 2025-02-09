export default function linkDetector(link: string) {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  const isUrl = urlRegex.test(link);
  const channelRegex = /(?:youtube\.com\/@(?!videos\/)([^\/\n\s?=]+))/;
  const isChannel = channelRegex.test(link);
  const videoRegex =
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const isVideo = videoRegex.test(link);
  return { isUrl, isChannel, isVideo };
}
