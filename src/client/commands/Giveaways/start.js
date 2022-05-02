import ms from "ms";
import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import saveNftContract from "../../../utils/etherscan/contract.js";
import fetchNftAmount from "../../../utils/bonus.js";

const config = {
  name: "start",
  description: "Starts a giveaway.",
  usage: "[channel] [duration] [winners] [contractAddress] [prize]",
  category: "Giveaways",
  accessableby: "Admins",
  aliases: [], // To add custom aliases just type ["alias1", "alias2"].
};

const run = async (client, message, args) => {
  const isManageMessages = message.member
    .permissionsIn(message.channel)
    .toArray()
    .includes("MANAGE_MESSAGES");

  let giveawayChannel = client.channels.cache.find(
    (channel) => `<#${channel.id}>` === args[0]
  );
  if (!giveawayChannel) {
    return message.channel.send(
      ":boom: Uh oh, I couldn't find that channel! Try again!"
    );
  }

  let giveawayDuration = args[1];
  if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
    return message.channel.send(
      ":boom: Hm. you haven't provided a duration. Can you try again?"
    );
  }

  let giveawayNumberWinners = args[2];
  if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
    return message.channel.send(
      ":boom: Uh... you haven't provided the amount of winners."
    );
  }

  let giveawayNft = args[3];
  const nft = await saveNftContract(giveawayNft, client.database.nft);

  let giveawayPrize = args.slice(4).join(" ");
  if (!giveawayPrize) {
    return message.channel.send(
      ":boom: Oh, it seems like you didn't give me a valid prize!"
    );
  }

  const giveaway = await client.giveawaysManager.start(giveawayChannel, {
    duration: ms(giveawayDuration),
    prize: giveawayPrize,
    winnerCount: parseInt(giveawayNumberWinners),
    hostedBy: message.author,
    botsCanWin: false,
    reaction: message.guild.emojis.resolve("965607040649154630"),
    bonusEntries: [
      {
        bonus: (member) => fetchNftAmount(member, giveawayNft),
        cumulative: false,
      },
    ],
    messages: {
      giveaway: ":tada: **GIVEAWAY** :tada:",
      giveawayEnded: ":tada: **GIVEAWAY ENDED** :tada:",
      inviteToParticipate: "React with 🎉 to participate!",
      winMessage: "Congratulations, {winners}! You won the ** {this.prize} **!",
      drawing: "Drawing: {timestamp}",
      embedFooter: "Giveaways",
      noWinner: "Not enough entrants to determine a winner!",
      hostedBy: `Hosted by: ${message.member}`,
      winners: "winner(s)",
      endedAt: "Ended at",
    },
  });

  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("Validate NOW!")
      .setStyle("PRIMARY")
      .setCustomId("validate")
  );

  const embeds = new MessageEmbed()
    .setTitle("NFT Contract")
    .addField("Giveaway:", `${giveaway.messageId}`)
    .addField("Contract Name:", `${nft.name}`)
    .addField("Contract Address:", `${giveawayNft}`);

  giveawayChannel
    .send({
      content: `**Click the button to validate how many NFTs do you have to earn more entries!!**`,
      embeds: [embeds],
      components: [row],
    })
    .then((message) =>
      setTimeout(() => message.delete(), ms(giveawayDuration))
    );

  message.channel.send(
    `:tada: Done! The giveaway for the \`${giveawayPrize}\` is starting in ${giveawayChannel}!`
  );
};

export { config, run };
