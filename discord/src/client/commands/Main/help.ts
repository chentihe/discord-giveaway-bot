import { ImageURLOptions, MessageEmbed, TextChannel } from "discord.js";
import {
  Discord,
  DIService,
  Permission,
  SimpleCommand,
  SimpleCommandMessage
} from "discordx";
import dotenv from "dotenv";
import Container, { Service } from "typedi";
import Bot from "../../client";

dotenv.config();

@Discord()
@Service()
class HelpCommand {
  constructor(private _bot: Bot) {}

  @Permission(false)
  @Permission({
    id: process.env.PERMISSION_ROLE_ID!,
    type: "ROLE",
    permission: true,
  })
  @SimpleCommand("help")
  async reroll(command: SimpleCommandMessage) {
    if (DIService.container) {
      const clazz: HelpCommand = (DIService.container as Container).get(HelpCommand);

      let avatarOptions: ImageURLOptions = {
        format: "png",
        dynamic: true,
        size: 1024,
      };

      const embed = new MessageEmbed()
        .setAuthor({
          name: clazz._bot.user!.username,
          url: "https://github.com/fez6/discord-giveaway-bot",
          iconURL: clazz._bot.user!.displayAvatarURL(avatarOptions),
        })
        .setThumbnail(clazz._bot.user!.displayAvatarURL(avatarOptions))
        .setTitle("Help")
        .setURL("https://github.com/fez6/discord-giveaway-bot")
        .setColor([114, 137, 218])
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
          iconURL: clazz._bot.user!.displayAvatarURL(avatarOptions),
        });

      if (command.message.guild) {
        (command.message.channel as TextChannel).send("Check your DMs!");
        command.message.delete();
        command.message.author.send(embed);
      } else {
        command.message.author.send(embed);
      }
    }
  }
}
