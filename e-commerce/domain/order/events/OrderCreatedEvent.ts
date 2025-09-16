import { DomainEvent } from "../../shared/events/DomainEvent";

export class OrderCreatedEvent extends DomainEvent {
    static readonly EVENT_NAME = 'OrderCreated';

    private readonly orderId: string;
    private readonly orderNumber: string;
    private readonly customerId: string;
    private readonly createdAt: Date = new Date();

    constructor(orderId: string, orderNumber: string, customerId: string) {
        super();
        this.orderId = orderId;
        this.orderNumber = orderNumber;
        this.customerId = customerId;
    }

    getEventName(): string {
        return OrderCreatedEvent.EVENT_NAME;
    }

    getAggregateId(): string {
        return this.orderId;
    }

    public toPrimitives(): any {
        return {
            ...super.toPrimitives(),
            orderId: this.orderId,
            orderNumber: this.orderNumber,
            customerId: this.customerId,
            createdAt: this.createdAt.toISOString()
        };
    }
}
