import { ValueObject } from "../../shared/domain/ValueObject";
import {Result} from "../../shared/core";
import {ProductPrice} from "../../order/value-object";

export class ProductId extends ValueObject<string>{
    static readonly CANT_BE_EMPTY = 'ProductId cannot be empty';

    constructor(id: string) {
        super(id);
    }

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(ProductId.CANT_BE_EMPTY);
        }
    }

    create(id: string): Result<ProductId> {
        try {
            const productId = new ProductId(id);
            return Result.ok<ProductId>(productId);
        } catch (error) {
            return Result.fail<ProductId>(error.message);
        }

    }
}