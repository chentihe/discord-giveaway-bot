const eventName = "giveawayEnded";

const eventFunction = (giveaway, winners) => {
  console.log(
    `Giveaway #${giveaway.messageID} ended! Winners: ${winners
      .map((member) => member.user.username)
      .join(", ")}`
  );
};

export { eventName, eventFunction };
