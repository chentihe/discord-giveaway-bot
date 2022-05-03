import dotenv from "dotenv";

dotenv.config();

const eventName = "messageCreate";

const eventFunction = async (client, message) => {
  if (message.author.bot || message.channel.type === "dm") return;

  let args = message.content
    .slice(process.env.COMMAND_PREFIX.length)
    .trim()
    .split(/ +/g);

  let cmd = args.shift().toLowerCase();

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`)))
    return message.channel.send(
      `Try ${process.env.COMMAND_PREFIX}help to see a list of my commands.`
    );

  if (!message.content.startsWith(process.env.COMMAND_PREFIX)) return;

  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    
  if (command) command.run(client, message, args);
};

export { eventName, eventFunction };
