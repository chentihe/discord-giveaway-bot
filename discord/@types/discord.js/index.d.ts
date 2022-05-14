import { Giveaway } from "discord-giveaways";
import { GuildMember, MessageReaction } from "discord.js";

declare global {
  interface ClientEvents {
    endedGiveawayReactionAdded: [giveaway: Giveaway,member: GuildMember,reaction: MessageReaction];
    giveawayDeleted: [giveaway: Giveaway];
    giveawayEnded: [giveaway: Giveaway, winners: Array<GuildMember>];
    giveawayReactionAdded: [giveaway: Giveaway,member: GuildMember,reaction: MessageReaction];
    giveawayReactionRemoved: [giveaway: Giveaway,member: GuildMember,reaction: MessageReaction];
    giveawayRerolled: [giveaway: Giveaway, winners: Array<GuildMember>];
  }
}
