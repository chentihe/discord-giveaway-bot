import fs from "fs";

const { Bot_Info } = JSON.parse(
  fs.readFileSync("config.json", "utf-8")
);

const eventName = "ready";

const eventFunction = async (client) => {
  console.log(
    `Bot: ${client.user.tag}\nChannels: ${client.channels.cache.size}\nServers: ${client.guilds.cache.size}\nUsers: ${client.users.cache.size}`
  );

  let statuses = [`${Bot_Info.prefix}start | ${Bot_Info.prefix}help `];

  setInterval(function () {
    let status = statuses[Math.floor(Math.random() * statuses.length)];

    client.user.setActivity(status, { type: "PLAYING" });
  }, 10000);
};

export { eventName, eventFunction };
