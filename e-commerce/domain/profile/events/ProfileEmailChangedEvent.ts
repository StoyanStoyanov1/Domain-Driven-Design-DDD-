import { DomainEvent } from "../../shared/events/DomainEvent";
import { ProfileId, Email } from "../value-object";

export class ProfileEmailChangedEvent extends DomainEvent {
    constructor(
        public readonly profileId: ProfileId,
        public readonly newEmail: Email
    ) {
        super();
    }

    getEventName(): string {
        return 'ProfileEmailChanged';
    }
}