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
class EndCommand {
  constructor(private _bot: Bot) {}

  @Permission(false)
  @Permission({
    id: process.env.PERMISSION_ROLE_ID!,
    type: "ROLE",
    permission: true,
  })
  @SimpleCommand("end", { argSplitter: " " })
  async end(
    @SimpleCommandOption("messageid", { type: SimpleCommandOptionType.String })
    giveawayId: string,
    command: SimpleCommandMessage
  ) {
    if (DIService.container) {
      const clazz: EndCommand = (DIService.container as Container).get(
        EndCommand
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
        .edit(giveaway.messageId, {
          setEndTimestamp: Date.now(),
        })
        .then(() => {
          (command.message.channel as TextChannel).send(
            "Giveaway will end in less than " +
              clazz._bot.giveawaysManager.options.endedGiveawaysLifetime! / 1000 +
              " seconds..."
          );
        })
        .catch((e) => {
          if (
            e.startsWith(
              `Giveaway with message ID ${
                giveaway!.messageId
              } has already ended.`
            )
          ) {
            (command.message.channel as TextChannel).send(
              "This giveaway has already ended!"
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
