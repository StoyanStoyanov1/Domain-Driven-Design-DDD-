import { Result } from '../../shared/core';
import { ValueObject } from '../../shared/domain/ValueObject';

export class Quantity extends ValueObject<number> {
    static readonly MIN_DEFAULT_QUANTITY = 0
    static readonly MAX_DEFAULT_QUANTITY = 10000;
    private readonly minQuantity: number;
    private readonly maxQuantity: number;

    private constructor(value: number, 
                        maxQuantity: number = Quantity.MAX_DEFAULT_QUANTITY,
                        minQuantity: number = Quantity.MIN_DEFAULT_QUANTITY
    ) {
        super(value);
        this.maxQuantity = maxQuantity;
        this.minQuantity = minQuantity;
    }

    protected validate(value: number): void {
         if (!Number.isInteger(value)) {
            throw new Error("Quantity must be an integer");
        }

        if (value < this.minQuantity || value > this.maxQuantity) {
            throw new Error(`Quantity must be between ${this.minQuantity} and ${this.maxQuantity}`);
        }
    }

    static create(value: number, maxQuantity?: number, minQuantity?: number): Result<Quantity> {
        try {
            const quantity = new Quantity(value, maxQuantity, minQuantity);
            return Result.ok<Quantity>(quantity);
        } catch (error) {
            return Result.fail<Quantity>(error.message);
        }
    }

    get quantity(): number {
        return this.getValue();
    }  

    static increaseQuantity(currentQuantity: Quantity, increaseBy: number): Quantity {
        const newQuantity = currentQuantity.getValue() + increaseBy;
        if (newQuantity > currentQuantity.maxQuantity) {
            throw new Error(`Cannot increase quantity beyond max limit of ${currentQuantity.maxQuantity}`);
        }
        return Quantity.create(newQuantity, currentQuantity.maxQuantity, currentQuantity.minQuantity).getValue();
    }

    static decreaseQuantity(currentQuantity: Quantity, decreaseBy: number): Quantity {
        const newQuantity = currentQuantity.getValue() - decreaseBy;
        if (newQuantity < currentQuantity.minQuantity) {
            throw new Error(`Cannot decrease quantity below min limit of ${currentQuantity.minQuantity}`);
        }
        return Quantity.create(newQuantity, currentQuantity.maxQuantity, currentQuantity.minQuantity).getValue();
    }
}