import { MessageActionRow, MessageButton } from "discord.js";
import { ArgsOf, Discord, Guard, On } from "discordx";
import dotenv from "dotenv";

dotenv.config();

@Discord()
class InteractionCreate {
  @On("interactionCreate")
  onInteraction([interaction]: ArgsOf<"interactionCreate">){
    if(!interaction.isButton()) return;

    const fields = interaction.message.embeds.shift()?.fields;
    const giveaway = fields?.find(field => field.name === "Giveaway:")?.value;
    const user = interaction.user.id;
    const nft = fields?.find(field => field.name === "Contract Address:")?.value;

    const url = new URL(process.env.VALIDATE_URL!);
    const params = {
      user: user,
      giveaway: giveaway,
      nft: nft
    };

    url.search = new URLSearchParams(JSON.stringify(params)).toString();

    const row: MessageActionRow = new MessageActionRow().addComponents(
      new MessageButton()
      .setLabel("Connect Wallet")
      .setStyle("LINK")
      .setURL(url.href)
    )

    interaction.reply({
      content: `giveaway: ${giveaway} \n member: ${user} \n nft: ${nft}`,
      components: [row],
      ephemeral: true
    })
  }
}