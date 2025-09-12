import { DomainEvent } from "../../shared/events/DomainEvent";

export class ProductPriceChanged extends DomainEvent {
    static EVENT_NAME = 'ProductPriceChanged';

    public readonly productId: string;
    public readonly oldPrice: number;
    public readonly newPrice: number;
    public readonly reason?: string;

    constructor(
        productId: string,
        oldPrice: number,
        newPrice: number,
        reason?: string
    ) {
        super();
        this.productId = productId;
        this.oldPrice = oldPrice;
        this.newPrice = newPrice;
        this.reason = reason;
    }

    getEventName(): string {
        return ProductPriceChanged.EVENT_NAME;
    }

    getAggregateId(): string {
        return this.productId;
    }

    getPriceChange(): number {
        return this.newPrice - this.oldPrice;
    }

     isPriceIncrease(): boolean {
        return this.newPrice > this.oldPrice;
    }

    public toPrimitives(): any {
        return {
            ...super.toPrimitives(),
            productId: this.productId,
            oldPrice: this.oldPrice,
            newPrice: this.newPrice,
            reason: this.reason,
            priceChange: this.getPriceChange()
        };
    }
}