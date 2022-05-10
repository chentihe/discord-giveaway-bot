import * as ready from "../events/client/ready.js";
import * as message from "../events/guild/message.js";
import * as interaction from "../events/guild/interaction.js";
import * as reactionAdded from "../events/giveaway/reactionAdded.js";
import * as reactionRemoved from "../events/giveaway/reactionRemoved.js";
import * as ended from "../events/giveaway/ended.js";

const LoadEvents = (client) => {
  const onceEvent = [ready];
  const events = [message, interaction];
  const giveawayEvents = [reactionAdded, reactionRemoved, ended];

  const load = (onceEvent, events, giveawayEvents) => {
    onceEvent.forEach((onceEvent) => {
      client.once(onceEvent.eventName, onceEvent.eventFunction.bind(null, client));
    });

    events.forEach((event) => {
      // bind() is for messageCreate
      client.on(event.eventName, event.eventFunction.bind(null, client));
    });

    giveawayEvents.forEach((event) => {
      client.giveawaysManager.on(event.eventName, event.eventFunction);
    });
  };

  load(onceEvent, events, giveawayEvents);
};

export default LoadEvents;
