# Minecraft Server Chat to WhatsApp

This project allows you and your friends to sync your Minecraft server chat with your WhatsApp group. (Using Discord)

## Overview

The project is designed for groups of friends who frequently play Minecraft together, but not everyone in the group can or wants to play all the time. While there are existing plugins like [DiscordSRV](https://www.spigotmc.org/resources/discordsrv.18494/), WhatsApp is often the preferred communication tool for many friend groups. This project was born out of the desire to stay active in the conversation even while playing Minecraft.

Since WhatsApp does not have public APIs for creating applications or bots, unlike Discord or Telegram, this project uses the [`whatsapp-web.js`](https://wwebjs.dev) library, which interacts with WhatsApp Web. ([`discord.js`](https://discord.js.org) is also required)

**Note:** Using alternative clients like `whatsapp-web.js` is against WhatsApp's terms of service. I am not responsible for any consequences or misuse of this project.

## How to Use This Project

1. **Download the Project**

2. **Create a WhatsApp Account for the Bot**

   You will need a WhatsApp account to use as the bot. While you can use your personal account, it is strongly advised to create a new account for security reasons. You can create an account using a VOIP number and register it with the WhatsApp Business app. This account will be used to scan the QR code for WhatsApp Web.

3. **Set Up Two Discord Bots**

   You will need to create two Discord bots via the [Discord Developer Portal](https://discord.com/developers/applications). One bot will send the chat from the Minecraft server to Discord when the server is online, and the other will read the chat and forward it to the WhatsApp group and vice versa. (You can probably do this with a single bot, but I opted to use two.) You also need to create a Discord server with two channels: one for the Minecraft chat “mirror” and one for the server console.

4. **Configure `whatsappClient.js`**

   Replace `discordClient.login(process.env.DISCORD_BOT_TOKEN);` in `whatsappClient.js` with your Discord bot token. Then, start the project and scan the QR code using the WhatsApp account you created earlier.

   At this point, find the ID of your WhatsApp group chat and set it as the `WHATSAPP_CHAT_GROUP` environment variable, or replace it directly in the code where this variable is set. You'll also need to modify the `data.json` file to replace the channel IDs for the console and server chat with those from your own Discord server.

   Start the project with `npm install` followed by `npm start`. If everything is set up correctly, you should see your bot online on Discord, and a "WhatsApp client ready!" message in the console and WhatsApp group.

5. **Configure the DiscordSRV Plugin**

   This part can be a bit tedious but is straightforward.

   - Download the DiscordSRV plugin and start your server to generate the configuration files. (On [Aternos](https://aternos.org/servers/) servers) go to Files > Plugins > DiscordSRV, where you’ll have access to various configuration files.

   **5a.** In `config.yml`, insert the token of your Discord bot where required, and restart the server. Next to `channels`, insert the ID of the Minecraft chat channel, and next to `DiscordConsoleChannelId`, insert the ID of the console channel. Scroll down and set `DiscordConsoleChannelBlockBots` to `false`.

   **5b.** In `messages.yml`, disable embeds for all messages and set a plain text message by configuring the "Content" field.

   **All set!**

## Issues

If you encounter any issues or need assistance, feel free to open an issue or contact me directly on Discord ([accel0]()) or Telegram ([@angeloprs](https://t.me/angeloprs)).
