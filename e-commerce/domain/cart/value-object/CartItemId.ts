import { Result } from '../../shared/core';
import { ValueObject } from "../../shared/domain/ValueObject";

export class CartItemId extends ValueObject<string> {
    static readonly ERROR_MESSAGE_VALUE_IS_EMPTY = 'CartItemId cannot be empty';
    constructor(id: string) {
        super(id);
    }

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(CartItemId.ERROR_MESSAGE_VALUE_IS_EMPTY);
        }
    }

    static create(id: string): Result<CartItemId> {
        try {
            const cartItemId = new CartItemId(id);
            return Result.ok<CartItemId>(cartItemId);
        } catch (error) {
            return Result.fail<CartItemId>(error.message);
        }
    }

}