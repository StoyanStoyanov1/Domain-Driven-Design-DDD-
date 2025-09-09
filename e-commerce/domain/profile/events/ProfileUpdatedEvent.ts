import { DomainEvent } from "../../shared/events/DomainEvent";
import { ProfileId } from "../value-object";

export class ProfileUpdatedEvent extends DomainEvent {
    constructor(
        public readonly profileId: ProfileId
    ) {
        super();
    }

    getEventName(): string {
        return 'ProfileUpdated';
    }
}