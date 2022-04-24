import * as ready from "../events/client/ready.js";
import * as message from "../events/guild/message.js";
import * as interaction from "../events/guild/interaction.js";
import * as reactionAdded from "../events/giveaway/reactionAdded.js";
import * as reactionRemoved from "../events/giveaway/reactionRemoved.js";
import * as ended from "../events/giveaway/ended.js";

const LoadEvents = (client) => {
  const events = [ready, message, interaction];
  const giveawayEvents = [reactionAdded, reactionRemoved, ended];

  const load = (events, giveawayEvents) => {
    events.forEach((event) => {
      // bind() is for messageCreate
      client.on(event.eventName, event.eventFunction.bind(null, client));
    });

    giveawayEvents.forEach((event) => {
      client.giveawaysManager.on(event.eventName, event.eventFunction);
    });
  };

  load(events, giveawayEvents);
};

export default LoadEvents;
