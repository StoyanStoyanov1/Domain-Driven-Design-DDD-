import {ValueObject} from "../../shared/domain/ValueObject";
import {PriceChangeChoices} from "../types";
import {Result} from "../../shared/core";

export class Price extends ValueObject<number>{
    static readonly MIN_PRICE = 0.00;
    private static CANNOT_BE_LESS_MIN_PRICE = `The price cannot be less than ${Price.MIN_PRICE}`;
    private static MUST_HAVE_TWO_DECIMAL_PLACES = 'Price must have exactly 2 decimal places';

    protected validate(value: number): void {
        if (value < Price.MIN_PRICE) {
            throw new Error(Price.CANNOT_BE_LESS_MIN_PRICE);
        }

        const regex = /^\d+(\.\d{2})$/;

        if (!regex.test(value.toString())) {
            throw new Error(Price.MUST_HAVE_TWO_DECIMAL_PLACES);
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

}