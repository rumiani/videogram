
export default async function commands(messageText: string) {

  const commandReplies: { [key: string]: () => string } = {
    "/help": () =>
      `Available commands:\n/menu\nDeveloper: @rumimaz`,
  };
  if (commandReplies[messageText]) return commandReplies[messageText]();
  else return "Bad request, please check out the /menu";
}
