import dotenv from "dotenv";
import { MessageActionRow, MessageButton } from "discord.js";

dotenv.config();

const eventName = "interactionCreate";

const eventFunction = async (client, interaction) => {
  if (!interaction.isButton()) return;
  const fields = interaction.message.embeds.shift().fields;
  const giveaway = fields.find((field) => field.name === "Giveaway:").value;
  const user = interaction.user.id;
  const nft = fields.find((field) => field.name === "Contract Address:").value;

  const url = new URL(process.env.VALIDATE_URL);
  const params = {
    user: user,
    giveaway: giveaway,
    nft: nft,
  };
  
  const query = new URLSearchParams(JSON.stringify(params));

  const endpoint = url.toString() + query.toString();

  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("Connect Wallet")
      .setStyle("LINK")
      .setURL(endpoint)
  );

  interaction.reply({
    // content can modify like "memeber: userName is going to validate nft: nftName"
    content: `giveaway: ${giveaway} \n member: ${user} \n nft: ${nft}`,
    components: [row],
    ephemeral: true,
  });
};

export { eventName, eventFunction };
