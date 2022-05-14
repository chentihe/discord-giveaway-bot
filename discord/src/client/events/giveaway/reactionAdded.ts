import { ArgsOf, Discord, Guard, On } from "discordx";

@Discord()
class GiveawayReactionAdded {
  @On("giveawayReactionAdded")
  onGiveawayReactionAdded([giveaway, member, reaction]: ArgsOf<"giveawayReactionAdded">){
    console.log(
      `${member.user.tag} entered giveaway #${giveaway.messageId} (${reaction.emoji.name})`
    );
  }
}