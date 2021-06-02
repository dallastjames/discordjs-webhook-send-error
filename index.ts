import { Client, Message, TextChannel } from "discord.js";

const client = new Client();

client.once("ready", () => console.log("Bot Ready"));
client.on("message", (message: Message) => {
  if (message.author.bot) {
    return;
  }
  if (message.content.startsWith("!!register")) {
    registerWebhook(message);
  }
  if (message.content.startsWith("!!send")) {
    sendWebhookMessage(client, message);
  }
});

const registerWebhook = async (message: Message): Promise<void> => {
  const channel = message.channel as TextChannel;
  const webhook = await channel.createWebhook("Example Only Webhook", {
    reason: "Used for Testing the Discordjs Webhook",
  });
  if (!webhook) {
    message.reply("Unable to configure webhook, check permissions!");
    return;
  }
  message.reply(
    `For Testing:\n \`!!send ${webhook.id} ${webhook.token} test message\``
  );
};

const sendWebhookMessage = async (
  client: Client,
  message: Message
): Promise<void> => {
  const args = message.content.split(" ");
  const webhookID = args[1];
  const webhookToken = args[2];
  const content = args.slice(3).join(" ");
  const webhook = await client.fetchWebhook(webhookID, webhookToken);
  await webhook.send(content);
};

client.login("BOT_KEY_HERE");
