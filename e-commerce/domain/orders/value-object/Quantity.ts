import { ValueObject } from "../../shared/domain/ValueObject";

export class Quantity extends ValueObject<number> {
    static readonly CANT_BE_NEGATIVE = 'Quantity cannot be negative';
    static readonly CANT_BE_FRACTIONAL = 'Quantity cannot be fractional';

    protected validate(value: number): void {
        if (value < 0) {
            throw new Error(Quantity.CANT_BE_NEGATIVE);
        }

        if (!Number.isInteger(value)) {
            throw new Error(Quantity.CANT_BE_FRACTIONAL);
        }
    }

    static create(value: number): Quantity {
        return new Quantity(value);
    }
}