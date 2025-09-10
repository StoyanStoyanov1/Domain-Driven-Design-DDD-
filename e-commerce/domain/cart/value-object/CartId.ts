import { Result } from "../../shared/core";
import { ValueObject } from "../../shared/domain/ValueObject";

export class CartId extends ValueObject<string> {
    static CANNOT_BE_EMPTY = 'CartId cannot be empty';

    private constructor(value: string) {
        super(value);
    }

    protected validate(value: string): void {
        if (!value || value.trim().length === 0) {
            throw new Error(CartId.CANNOT_BE_EMPTY);
        }
    }

    static create(value: string): Result<CartId> {
        try {
            const cartId = new CartId(value);
            return Result.ok<CartId>(cartId);
        } catch (error) {
            return Result.fail<CartId>(error.message);
        }
    }
}