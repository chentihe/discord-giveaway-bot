import ms from "ms";
import {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Message,
  TextChannel,
  GuildMember,
} from "discord.js";
import {
  Discord,
  SimpleCommand,
  SimpleCommandMessage,
  SimpleCommandOption,
  SimpleCommandOptionType,
} from "discordx";
import saveNftContract from "../../../utils/etherscan/contract.js";
import fetchNftAmount from "../../../utils/bonusEntry/bonus.js";
import Bot from "../../client";
import { Nft } from "../../../db/entity/nft.entity";

@Discord()
class StartCommand {
  @SimpleCommand("start", { argSplitter: " " })
  async start(
    @SimpleCommandOption("channel", { type: SimpleCommandOptionType.Channel })
    giveawayChannel: TextChannel,
    @SimpleCommandOption("winners", { type: SimpleCommandOptionType.Number })
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

    (command.message.channel as TextChannel).send(
      `:tada: Done! The giveaway for the \`${prize}\` is starting in <#${giveawayChannel.id}>!`
    );
  }
}

export default StartCommand;
