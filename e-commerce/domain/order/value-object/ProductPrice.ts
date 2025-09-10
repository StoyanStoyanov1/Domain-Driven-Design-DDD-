import { Result } from "../../shared/core";
import {ValueObject} from "../../shared/domain/ValueObject";

export class ProductPrice extends ValueObject<number> {

    static readonly CANT_BE_NEGATIVE = 'Product price cannot be negative';

    constructor(value: number) {
        super(Math.round(value * 100) / 100);
    }

    protected validate(value: number) {
        if (value < 0) {
            throw new Error(ProductPrice.CANT_BE_NEGATIVE);
        }
    }

    getFormatted(): string {
        return this.value.toFixed(2);
    }

    toString(): string {
        return this.getFormatted();
    }

    static create(value: number): Result<ProductPrice> {
        try {
            return Result.ok(new ProductPrice(value));
        } catch (error) {
            return Result.fail<ProductPrice>(error.message);
        }   
    }
}
