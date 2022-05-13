import { MessageEmbed } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const config = {
  name: "help",
  description: "Get a list of bot commands.",
  usage: "help",
  category: "Main",
  accessableby: "Everyone",
  aliases: [], // To add custom aliases just type ["alias1", "alias2"].
};

const run = async (client, message, args) => {
  let avatarOptions = {
    format: "png",
    dynamic: true,
    size: 1024,
  };

  const embed = new MessageEmbed()
    .setAuthor({
      name: client.user.username,
      url: "https://github.com/fez6/discord-giveaway-bot",
      iconURL: client.user.displayAvatarURL({ ...avatarOptions }),
    })
    .setThumbnail(client.user.displayAvatarURL({ ...avatarOptions }))
    .setTitle("Help")
    .setURL("https://github.com/fez6/discord-giveaway-bot")
    .setColor("7289da")
    .setDescription(
      `You want to create a giveaway bot yourself?\n[Check out our Github page!](https://github.com/fez6/discord-giveaway-bot)`
    )
    .addFields(
      {
        name: `🎉 ${process.env.COMMAND_PREFIX}start [channel] [duration] [winners] [prize]`,
        value: [
          "The channel has to be visible to the giveaway bot.",
          "Duration is stated in a number and a time variable.",
          "Winners is stated in a positive number.",
          "Prize can be anything except blank.",
        ].join("\n"),
      },
      {
        name: "👥 Example:",
        value: [
          `⌨️ ${process.env.COMMAND_PREFIX}start #general 10m 1 $9.99 Nitro`,
          `➡️ Creates a \`10 minute\` long giveaway with \`1\` winner and`,
          `\`$9.99 Nitro\` as a prize in \`#general\`.`,
        ].join("\n"),
      },
      {
        name: `❌ ${process.env.COMMAND_PREFIX}end [message-id]`,
        value:
          "Message-ID has to be the **ID** of the giveaway message.\n**Not the link!**",
      },
      {
        name: "👥 Example:",
        value: `⌨️ ${process.env.COMMAND_PREFIX}end 892678258946659587\n➡️ Ends the giveaway with the message-ID \`892678258946659587\`.`,
      },
      {
        name: `🔍 ${process.env.COMMAND_PREFIX}reroll [message-id]`,
        value:
          "Message-ID has to be the **ID** of the giveaway message.\n**Not the link!**",
      },
      {
        name: "👥 Example:",
        value: `⌨️ ${process.env.COMMAND_PREFIX}reroll 892678258946659587\n➡️ Selects new winners for the giveaway with the message-ID \`892678258946659587\`.`,
      }
    )
    .setFooter({
      text: "Made with 💖 and discord.js by fez",
      iconURL: client.user.displayAvatarURL({ ...avatarOptions }),
    });

  if (message.guild) {
    message.channel.send("Check your DMs!");
    message.delete();
    message.author.send(embed);
  } else {
    message.author.send(embed);
  }
};

export { config, run };
