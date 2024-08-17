require("dotenv").config();
const { consoleChannel, mcChatChannel } = require("./data.json");
//WHATSAPP
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const whatsappClient = new Client({
  authStrategy: new LocalAuth({
    clientId: "whatsappClient1",
  }),
});

whatsappClient.on("ready", () => {
  console.clear();
  console.log("whatsappClient is ready!");
  whatsappClient.sendMessage(
    process.env.WHATSAPP_CHAT_GROUP,
    "whatsappClient is ready!"
  );
});

whatsappClient.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
  qrcode.generate(qr, { small: true });
});

whatsappClient.on("message_create", async (message) => {
  if (message.from == process.env.WHATSAPP_CHAT_GROUP) {
    const contact = await message.getContact();
    if (contact.isMe) return;
    sendMinecraftMessage(contact.shortName, message.body);
  }
});

whatsappClient.initialize();

//FUNCTIONS
function sendWhatsAppMessage(message) {
  whatsappClient.sendMessage(process.env.WHATSAPP_CHAT_GROUP, message);
}

function sendMinecraftMessage(user, message) {
  discordClient.channels.cache
    .get(consoleChannel)
    .send(
      `tellraw @a ["",{"text":"["},{"text":"WhatsApp","bold":true,"color":"green"},{"text":"] | <"},{"text":"${user}","color":"dark_green"},{"text":"> ${message}"}]`
    );
}

//DISCORD
const { discordClient } = require("./discordClient");

discordClient.on("messageCreate", (msg) => {
  if (msg.channel.id == consoleChannel) return;
  sendWhatsAppMessage(
    `${
      msg.channel.id == mcChatChannel
        ? `[IN-GAME CHAT]\n ${msg.content}`
        : `*${msg.author.username}*\n${msg.content}`
    }`
  );
});

discordClient.login(process.env.DISCORD_BOT_TOKEN);

process.on("uncaughtException", (err) => {
  console.error(err);
  console.log(`\n\nResuming...\n\n`);
});
process.on("unhandledRejection", (err) => {
  console.error(err);
  console.log(`\n\nResuming...\n\n`);
});
