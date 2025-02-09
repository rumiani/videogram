// import fs from 'fs';
// import { Bot } from 'grammy';

// const botToken = process.env.TELEGRAM_BOT_TOKEN!;
// const bot = new Bot(botToken);
// export default async function extractVideoIdHandler(url: string) {
//     const userFilePath = './lastSubscriberCount.json';
//     function getUserSubscriberData(): Record<string, number> {
//         if (fs.existsSync(userFilePath)) {
//           const data = fs.readFileSync(userFilePath, 'utf-8');
//           return JSON.parse(data);
//         }
//         return {}; // Return an empty object if the file doesn't exist
//       }
//     function updateUserSubscriberData(userId: string, subscriberCount: number) {
//         const userData = getUserSubscriberData();
//         userData[userId] = subscriberCount; // Update the subscriber count for the user
      
//         // Write the updated data back to the JSON file
//         fs.writeFileSync(userFilePath, JSON.stringify(userData, null, 2), 'utf-8');
//       }
//       async function checkAndNotifySubscribers(userId: string, channelId: string) {
//         const currentSubscriberCount = await getSubscriberCount(channelId);
//         const userData = getUserSubscriberData();
//         const lastSubscriberCount = userData[userId] || 0; // Default to 0 if no data exists for the user
      
//         // If the subscriber count has increased
//         if (currentSubscriberCount > lastSubscriberCount) {
//           updateUserSubscriberData(userId, currentSubscriberCount); // Update the subscriber count for the user
//           try {
//             await bot.api.sendMessage(
//               userId, // Send to the user's Telegram ID
//               `You have gained new subscribers! The current subscriber count is: ${currentSubscriberCount}`
//             );
//           } catch (error) {
//             console.error('Error sending Telegram message:', error);
//           }
//         }
//       }
//       //https://www.youtube.com/channel/UCtj5j2ghIhprRzHYafZcPog
//       setInterval(() => {
//         checkAndNotifySubscribers(userId, channelId);
//       }, 60000); // Check every minute
      
// }