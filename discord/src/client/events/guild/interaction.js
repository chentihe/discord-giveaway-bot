import fs from "fs";
import { MessageActionRow, MessageButton } from "discord.js";

const { Bot_Info } = JSON.parse(fs.readFileSync("config.json", "utf-8"));

const eventName = "interactionCreate";

const eventFunction = async (client, interaction) => {
  if (!interaction.isButton()) return;
  const fields = interaction.message.embeds.shift().fields;
  const giveaway = fields.find((field) => field.name === "Giveaway:").value;
  const user = interaction.user.id;
  const nft = fields.find((field) => field.name === "Contract Address:").value;

  const url = new URL(Bot_Info.validateUrl);
  const params = {
    user: user,
    giveaway: giveaway,
    nft: nft,
  };
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("Connect Wallet")
      .setStyle("LINK")
      .setURL(url.toString())
  );

  interaction.reply({
    // content can modify like "memeber: userName is going to validate nft: nftName"
    content: `giveaway: ${giveaway} \n member: ${user} \n nft: ${nft}`,
    components: [row],
    ephemeral: true,
  });
};

export { eventName, eventFunction };
