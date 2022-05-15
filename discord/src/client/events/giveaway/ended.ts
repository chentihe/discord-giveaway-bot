import { ArgsOf, Discord, On } from "discordx";

@Discord()
class GiveawayEnded {
  @On("giveawayEnded")
  onGiveawayEnded([giveaway, winners]: ArgsOf<"giveawayEnded">) {
    console.log(
      `Giveaway #${giveaway.messageId} ended! Winners: ${winners
        .map((member) => member.user.username)
        .join(", ")}`
    );
  }
}
