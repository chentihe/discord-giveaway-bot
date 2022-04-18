import * as ready from "../events/client/ready.js";
import * as message from "../events/guild/message.js";

const LoadEvents = (client) => {
  const events = [ready, message];

  const load = (events) => {
    events.forEach((event) => {
      // bind() is for messageCreate
      client.on(event.eventName, event.eventFunction.bind(null, client));
    });
  };

  load(events);
};

export default LoadEvents;