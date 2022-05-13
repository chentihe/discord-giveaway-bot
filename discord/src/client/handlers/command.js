import * as end from "../commands/Giveaways/end.js";
import * as reroll from "../commands/Giveaways/reroll.js";
import * as start from "../commands/Giveaways/start.js";
import * as help from "../commands/Main/help.js";

const LoadCommands = (client) => {
  const commands = [end, reroll, start, help];
  
  const load = (commands) => {
    commands.forEach((command) => {
      client.commands.set(command.config.name, command);
      if (command.config.aliases) {
        command.config.aliases.forEach((alias) => {
          client.aliases.set(alias, command.config.name);
        });
      }
    });
  };

  load(commands);
};

export default LoadCommands;
