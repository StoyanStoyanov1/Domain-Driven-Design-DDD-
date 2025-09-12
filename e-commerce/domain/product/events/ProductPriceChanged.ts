import { DomainEvent } from "../../shared/events/DomainEvent";

export class ProductPriceChanged extends DomainEvent {
    constructor(
        public readonly productId: string,
        public readonly oldPrice: number,
        public readonly newPrice: number,
        public readonly reason?: string
    ) {
        super();
    }

    getEventName(): string {
        return "ProductPriceChanged";
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