import { DomainEvent } from "../../shared/events/DomainEvent";

export class ProductCreateEvent extends DomainEvent {
    static EVENT_NAME = 'ProductCreated';

    public readonly productId: string;
    public readonly sku: string;
    public readonly name: string;
    public readonly shortDescription: string;
    public readonly fullDescription: string;
    public readonly price: number;
    public readonly status: string;
    public readonly createdAt: Date;
    constructor(
        productId: string,
        sku: string,
        name: string,
        shortDescription: string,
        fullDescription: string,
        price: number,
        status: string,
        createdAt: Date
    ) {
        super();
        this.productId = productId;
        this.sku = sku;
        this.name = name;
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;
        this.price = price;
        this.status = status;
        this.createdAt = createdAt;
    }

    getEventName(): string {
        return ProductCreateEvent.EVENT_NAME;
    }

    getAggregateId(): string {
        return this.productId;
    }

    public toPrimitives(): any {
        return {
            ...super.toPrimitives(),
            productId: this.productId,
            sku: this.sku,
            name: this.name,
            shortDescription: this.shortDescription,
            fullDescription: this.fullDescription,
            price: this.price,
            status: this.status,
            createdAt: this.createdAt.toISOString()
        };
    }
}