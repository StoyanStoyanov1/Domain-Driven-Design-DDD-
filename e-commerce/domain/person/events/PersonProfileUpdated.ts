import { DomainEvent } from "../../shared/events/DomainEvent";

export class PersonProfileUpdated extends DomainEvent {
    static EVENT_NAME = 'PersonProfileUpdated';
    constructor(
        public readonly personId: string,
        public readonly updatedFields: string[]
    ) {
        super();
    }
    getEventName(): string {
        return PersonProfileUpdated.EVENT_NAME;
    }
    getAggregateId(): string {
        return this.personId;
    }
}