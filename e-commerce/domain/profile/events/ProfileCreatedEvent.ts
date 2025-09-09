import {DomainEvent} from "../../shared/events/DomainEvent";
import {Email, Name, ProfileId} from "../value-object";

export class ProfileCreatedEvent extends DomainEvent{
    constructor(
        public readonly profileId: ProfileId,
        public readonly email: Email,
        public readonly name: Name,
    ) {
        super();
    }

    getEventName(): string {
        return "ProfileCreaded";
    }
}