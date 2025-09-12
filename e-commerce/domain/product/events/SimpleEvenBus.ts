import { DomainEvent } from "../../shared/events/DomainEvent";

type EventHandler = { handle: (event: DomainEvent) => Promise<void> };

export class SimpleEventBus {
    private handlers: Map<string, EventHandler[]> = new Map();

    subscribe(eventName: string, handler: EventHandler) {
        if (!this.handlers.has(eventName)) {
            this.handlers.set(eventName, []);
        }
        this.handlers.get(eventName)!.push(handler);
    }

    async publish(event: DomainEvent) {
        const handlers = this.handlers.get(event.getEventName()) || [];
        for (const handler of handlers) {
            await handler.handle(event);
        }
    }
}