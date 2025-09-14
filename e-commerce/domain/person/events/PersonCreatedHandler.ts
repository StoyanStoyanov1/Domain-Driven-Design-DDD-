import { PersonCreatedEvent } from "./PersonCreatedEvent";

export class PersonCreatedHandler {
    handle(event: PersonCreatedEvent) {
        // Handle the person creation event
        // await functiontoCreatePersonInDatabase(event);

        console.log(`Person created: ${event.getAggregateId()}: (Name: ${event.getEventName()}, Email: ${event.getAggregateId()})`);
    }
}