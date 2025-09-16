import { ValueObject } from "../../shared/domain/ValueObject";

export class PrecentageDiscount extends ValueObject<number> {
    static readonly CANT_BE_NEGATIVE = 'Precentage discount cannot be negative';
    static readonly CANT_BE_MORE_THAN_100 = 'Precentage discount cannot be more than 100';

    constructor(value: number) {
        super(value);
    }

    protected validate(value: number): void {
        if (value < 0) {
            throw new Error(PrecentageDiscount.CANT_BE_NEGATIVE);
        }

        if (value > 100) {
            throw new Error(PrecentageDiscount.CANT_BE_MORE_THAN_100);
        }
    }

    static create(value: number): PrecentageDiscount {
        return new PrecentageDiscount(value);
    }
}

