import { ArgsOf, Discord, Guard, On } from "discordx";

@Discord()
class GiveawayEnded {
  @On("GiveawayEnded")
  onGiveawayEnded([giveaway, winners]: ArgsOf<"giveawayEnded">){
    console.log(
      `Giveaway #${giveaway.messageId} ended! Winners: ${winners
        .map((member) => member.user.username)
        .join(", ")}`
    );
  }
}