import { TextChannel } from "discord.js";
import {
  Discord,
  DIService,
  Permission,
  SimpleCommand,
  SimpleCommandMessage,
  SimpleCommandOption,
  SimpleCommandOptionType,
} from "discordx";
import Container, { Service } from "typedi";
import Bot from "../../client";

@Discord()
@Service()
class RerollCommand {
  constructor(private _bot: Bot) {}

  @Permission(false)
  @Permission({
    id: process.env.PERMISSION_ROLE_ID!,
    type: "ROLE",
    permission: true,
  })
  @SimpleCommand("reroll", { argSplitter: " " })
  async reroll(
    @SimpleCommandOption("messageid", { type: SimpleCommandOptionType.String })
    giveawayId: string,
    command: SimpleCommandMessage
  ) {
    if (
      !command.message.member?.permissions.has("MANAGE_MESSAGES") &&
      !command.message.member?.roles.cache.some(
        (role) => role.name === "Giveaways"
      )
    ) {
      return (command.message.channel as TextChannel).send(
        ":boom: You need to have the `MANAGE_MESSAGES` permission to reroll giveaways."
      );
    }

    if (DIService.container) {
      const clazz: RerollCommand = (DIService.container as Container).get(
        RerollCommand
      );

      let giveaway = clazz._bot.giveawaysManager.giveaways.find(
        (g) => g.messageId === giveawayId
      );

      if (!giveaway) {
        return (command.message.channel as TextChannel).send(
          ":boom: Hm. I can't seem to find a giveaway for `" + giveawayId + "`."
        );
      }

      clazz._bot.giveawaysManager
        .reroll(giveaway.messageId)
        .then(() => {
          (command.message.channel as TextChannel).send("Giveaway rerolled!");
        })
        .catch((e) => {
          if (
            e.startsWith(
              `Giveaway with message ID ${giveaway!.messageId} has not ended.`
            )
          ) {
            (command.message.channel as TextChannel).send(
              "This giveaway has not ended!"
            );
          } else {
            console.error(e);
            (command.message.channel as TextChannel).send(
              "An error occurred..."
            );
          }
        });
    }
  }
}
