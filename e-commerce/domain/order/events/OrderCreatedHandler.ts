import { OrderCreatedEvent } from "./OrderCreatedEvent";

export class OrderCreatedHandler {
    handle(event: OrderCreatedEvent) {
        // Handle the order creation event
        // await functiontoCreateOrderInDatabase(event);

        console.log(`Order created: ${event.getAggregateId()}: (Name: ${event.getEventName()}, ID: ${event.getAggregateId()})`);
    }
}