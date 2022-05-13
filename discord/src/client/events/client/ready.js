import dotenv from "dotenv";

dotenv.config();

const eventName = "ready";

const eventFunction = async (client) => {
  // make sure all guilds are in cache
  await client.guilds.fetch();

  // init all application commands
  await client.initApplicationCommands({
    guild: { log: true },
    global: { log: true },
  });

  console.log(
    `Bot: ${client.user.tag}\nChannels: ${client.channels.cache.size}\nServers: ${client.guilds.cache.size}\nUsers: ${client.users.cache.size}`
  );

  let statuses = [
    `${process.env.COMMAND_PREFIX}start | ${process.env.COMMAND_PREFIX}help `,
  ];

  // init permissions; enabled log to see changes
  await client.initApplicationPermissions(true);

  // uncomment this line to clear all guild commands,
  // useful when moving to global commands from guild commands
  //  await client.clearApplicationCommands(
  //    ...client.guilds.cache.map((g) => g.id)
  //  );

  setInterval(function () {
    let status = statuses[Math.floor(Math.random() * statuses.length)];

    client.user.setActivity(status, { type: "PLAYING" });
  }, 10000);
};

export { eventName, eventFunction };
