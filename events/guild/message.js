import fs from "fs";

const { Bot_Info } = JSON.parse(
  fs.readFileSync("config.json", "utf-8")
);

const eventName = "message";

const eventFunction = async (client, message) => {
  if (message.author.bot || message.channel.type === "dm") return;

  let args = message.content.slice(Bot_Info.prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`)))
    return message.channel.send(
      `Try ${Bot_Info.prefix}help to see a list of my commands.`
    );
  if (!message.content.startsWith(Bot_Info.prefix)) return;
  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (command) command.run(client, message, args);
};

export { eventName, eventFunction };
