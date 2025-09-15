import { DomainEvent } from "../../shared/events/DomainEvent";

export class PersonBankCardUpdated extends DomainEvent {
    static EVENT_NAME = 'PersonBankCardUpdated';
    constructor(
        public readonly personId: string,
        public readonly bankCardId: string,
        public readonly updatedFields: string[]
    ) {
        super();
    }
    getEventName(): string {
        return PersonBankCardUpdated.EVENT_NAME;
    }
    getAggregateId(): string {
        return this.personId;
    }
}