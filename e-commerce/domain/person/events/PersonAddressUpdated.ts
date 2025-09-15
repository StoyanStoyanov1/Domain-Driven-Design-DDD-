import { DomainEvent } from "../../shared/events/DomainEvent";

export class PersonAddressUpdated extends DomainEvent {
    static EVENT_NAME = 'PersonAddressUpdated';
    constructor(
        public readonly personId: string,
        public readonly addressId: string,
        public readonly updatedFields: string[]
    ) {
        super();
    }
    getEventName(): string {
        return PersonAddressUpdated.EVENT_NAME;
    }
    getAggregateId(): string {
        return this.personId;
    }
}