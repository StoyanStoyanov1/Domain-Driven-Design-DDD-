import { DomainEvent } from "../../shared/events/DomainEvent";

export class ProductUpdatedEvent extends DomainEvent {
    constructor(
        public readonly productId: string,
        public readonly sku: string,
        public readonly name: string,
        public readonly shortDescription: string,
        public readonly fullDescription: string,
        public readonly price: number,
        public readonly status: string,
        public readonly updatedAt: Date
    ) {
        super();
    }

    getEventName(): string {
        return "ProductUpdated";
    }

    getAggregateId(): string {
        return this.productId;
    }
}