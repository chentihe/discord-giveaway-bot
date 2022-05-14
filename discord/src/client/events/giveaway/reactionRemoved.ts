import { ArgsOf, Discord, Guard, On } from "discordx";

@Discord()
class GiveawayReactionRemoved {
  @On("giveawayReactionRemoved")
  onGiveawayReactionRemoved([giveaway, member, reaction]: ArgsOf<"giveawayReactionRemoved">){
    console.log(
      `${member.user.tag} unreact to giveaway #${giveaway.messageId} (${reaction.emoji.name})`
    );
  }
}