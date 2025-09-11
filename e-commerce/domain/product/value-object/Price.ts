import {ValueObject} from "../../shared/domain/ValueObject";
import {PriceChangeChoices} from "../types";
import {Result} from "../../shared/core";

export class Price extends ValueObject<number>{
    static readonly MIN_PRICE = 0;
    private static CANNOT_BE_LESS_MIN_PRICE = `The price cannot be less than ${Price.MIN_PRICE}`;

    private readonly createdAt: Date;
    private currentPrice: number;
    private updatedAt: Date;
    private priceChangeStatus: PriceChangeChoices;

    constructor(value: number) {
        super(value);
        this.currentPrice = value;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.priceChangeStatus = PriceChangeChoices.EQUAL;
    }

    protected validate(value: number): void {
        if (value < Price.MIN_PRICE) {
            throw new Error(Price.CANNOT_BE_LESS_MIN_PRICE);
        }
    }

    static create(value: number): Result<Price> {
        try {
            const fixedPriceToTwo = Math.round(value * 100) / 100;
            const price = new Price(fixedPriceToTwo);
            return Result.ok<Price>(price);
        }
        catch (error) {
            return Result.fail<Price>(error.message);
        }

    }

    static updateCurrentPrice(price: Price, newPrice: number): Price {
        if (newPrice < Price.MIN_PRICE) {
            throw new Error(Price.CANNOT_BE_LESS_MIN_PRICE);
        }

        if (newPrice === price.currentPrice) {
            price.priceChangeStatus = PriceChangeChoices.EQUAL;
            return price;
        }

        if (newPrice > price.currentPrice) {
            price.priceChangeStatus = PriceChangeChoices.INCREASE;
        }

        if (newPrice < price.currentPrice) {
            price.priceChangeStatus = PriceChangeChoices.DECREASE;
        }

        price.currentPrice = newPrice;
        price.updatedAt = new Date();
        return price;
    }

    static referencePrice(price: Price): number {
        return Math.abs(price.currentPrice - price.value);
    }

    get getCurrentPrice(): number {
        return this.currentPrice;
    }

    get getCreatedAt(): Date {
        return this.createdAt;
    }

    get getUpdatedAt(): Date {
        return this.updatedAt;
    }

    get getPriceChangeStatus(): PriceChangeChoices {
        return this.priceChangeStatus;
    }

    get getFormatted(): string {
        return this.currentPrice.toFixed(2);
    }

    get referencePrice(): number {
        return Price.referencePrice(this);
    }



}