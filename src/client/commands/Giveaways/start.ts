import ms from "ms";
import {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Message,
  TextChannel,
  GuildMember,
  Channel,
} from "discord.js";
import {
  Discord,
  SimpleCommand,
  SimpleCommandMessage,
  SimpleCommandOption,
  SimpleCommandOptionType,
} from "discordx";
import saveNftContract from "../../../utils/etherscan/contract.js";
import fetchNftAmount from "../../../utils/bonus.js";
import Bot from "../../client";
import { Nft } from "../../../db/entity/Nft";

@Discord()
class StartCommand {
  @SimpleCommand("start", { argSplitter: " " })
  async start(
    @SimpleCommandOption("channel", { type: SimpleCommandOptionType.Channel })
    giveawayChannel: TextChannel,
    @SimpleCommandOption("channel", { type: SimpleCommandOptionType.Number })
    winners: number,
    @SimpleCommandOption("duration", { type: SimpleCommandOptionType.Number })
    duration: number,
    @SimpleCommandOption("nft", { type: SimpleCommandOptionType.String })
    contractId: string,
    command: SimpleCommandMessage
  ) {
    const giveawayDuration: string = ms(duration);

    const nft: Nft = await saveNftContract(contractId);

    const prize: string = command.message.content
      .slice(command.prefix.toString().length)
      .trim()
      .split(/ +/g)
      .slice(4)
      .join(" ");

    const giveaway = await (<Bot>command.message.client).giveawaysManager.start(
      giveawayChannel,
      {
        duration: ms(giveawayDuration),
        prize: prize,
        winnerCount: winners,
        hostedBy: command.message.author,
        botsCanWin: false,
        reaction: command.message.guild!.emojis.resolve("965607040649154630")!,
        bonusEntries: [
          {
            bonus: (member: GuildMember) => fetchNftAmount(member, contractId),
            cumulative: false,
          },
        ],
        messages: {
          giveaway: ":tada: **GIVEAWAY** :tada:",
          giveawayEnded: ":tada: **GIVEAWAY ENDED** :tada:",
          inviteToParticipate: "React with 🎉 to participate!",
          winMessage:
            "Congratulations, {winners}! You won the ** {this.prize} **!",
          drawing: "Drawing: {timestamp}",
          embedFooter: "Giveaways",
          noWinner: "Not enough entrants to determine a winner!",
          hostedBy: `Hosted by: ${command.message.member}`,
          winners: "winner(s)",
          endedAt: "Ended at",
        },
      }
    );

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
      .addField("Contract Address:", `${contractId}`);

    giveawayChannel
      .send({
        content: `**Click the button to validate how many NFTs do you have to earn more entries!!**`,
        embeds: [embeds],
        components: [row],
      })
      .then((message: Message) =>
        setTimeout(() => message.delete(), ms(giveawayDuration))
      );

    const textChannel = command.message.channel as TextChannel;
    textChannel.send(
      `:tada: Done! The giveaway for the \`${prize}\` is starting in ${giveawayChannel}!`
    );
  }
}

const config = {
  name: "start",
  description: "Starts a giveaway.",
  usage: "[channel] [duration] [winners] [contractAddress] [prize]",
  category: "Giveaways",
  accessableby: "Admins",
  aliases: [], // To add custom aliases just type ["alias1", "alias2"].
};

const run = async (client: Bot, message: Message, args: Array<string>) => {
  const isManageMessages = message.member
    .permissionsIn(message.channel)
    .toArray()
    .includes("MANAGE_MESSAGES");

  const messageChannel: TextChannel = message.channel as TextChannel;

  let giveawayChannel = client.channels.cache
    .filter((channel) => channel instanceof TextChannel)
    .find((channel) => `<#${channel.id}>` === args[0]);

  if (!giveawayChannel) {
    return messageChannel.send(
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
