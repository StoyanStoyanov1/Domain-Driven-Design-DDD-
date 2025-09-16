import { Result } from "../../shared/core";
import { ValueObject } from "../../shared/domain/ValueObject";

export class Price extends ValueObject<number> {

    static readonly CANT_BE_NEGATIVE = 'Product price cannot be negative';
    static readonly PRICE_MUSS_HAVE_DECIMAL_PLACES = 'Price must have at most 2 decimal places';

    constructor(value: number) {
        super(Math.round(value * 100) / 100);
    }

    protected validate(value: number) {
        if (value < 0) {
            throw new Error(Price.CANT_BE_NEGATIVE);
        }

        if (!Number.isInteger(value * 100)) {
            throw new Error(Price.PRICE_MUSS_HAVE_DECIMAL_PLACES);
        }

    }

    static create(value: number): Result<Price> {
        try {
            const formatedForPrice = parseFloat((Math.round(value * 100) / 100).toFixed(2));
            const price = new Price(formatedForPrice);
            return Result.ok<Price>(price);
        } catch (error) {
            return Result.fail<Price>(error.message);
        }
    }
}
