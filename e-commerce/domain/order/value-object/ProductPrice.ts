import {ValueObject} from "../../shared/domain/ValueObject";

class ProductPrice extends ValueObject<number> {

    static readonly CANT_BE_NEGATIVE = 'Product price cannot be negative';

    constructor(value: number) {
        super(Math.round(value * 100) / 100); // Закръгляване до 2 знака
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
}
