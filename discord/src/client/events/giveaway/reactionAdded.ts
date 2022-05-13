const eventName = "giveawayReactionAdded";

const eventFunction = (giveaway, member, reaction) => {
  console.log(
    `${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`
  );
};

export { eventName, eventFunction };
