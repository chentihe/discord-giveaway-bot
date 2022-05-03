import dotenv from "dotenv";

dotenv.config();

const eventName = "ready";

const eventFunction = async (client) => {
  console.log(
    `Bot: ${client.user.tag}\nChannels: ${client.channels.cache.size}\nServers: ${client.guilds.cache.size}\nUsers: ${client.users.cache.size}`
  );

  let statuses = [
    `${process.env.COMMAND_PREFIX}start | ${process.env.COMMAND_PREFIX}help `,
  ];

  setInterval(function () {
    let status = statuses[Math.floor(Math.random() * statuses.length)];

    client.user.setActivity(status, { type: "PLAYING" });
  }, 10000);
};

export { eventName, eventFunction };
