import {DomainEvent} from "../../shared/events/DomainEvent";

export class ProfileCreatedEvent extends DomainEvent{
    constructor(
        public readonly profileId: string,
        public readonly email: string,
        public readonly name: string,
    ) {
        super();
    }

    getEventName(): string {
        return "ProfileCreaded";
    }
}