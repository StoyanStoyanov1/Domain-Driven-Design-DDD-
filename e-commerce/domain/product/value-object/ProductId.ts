import { ValueObject } from "../../shared/domain/ValueObject";
import {Result} from "../../shared/core";
import {generateId} from "../../shared/utils";
export class ProductId extends ValueObject<string>{
    static readonly CANT_BE_EMPTY = 'ProductId cannot be empty';

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(ProductId.CANT_BE_EMPTY);
        }
    }

    static create(): Result<ProductId> {
        try {
            const productId = new ProductId(generateId());
            return Result.ok<ProductId>(productId);
        } catch (error) {
            return Result.fail<ProductId>(error.message);
        }

    }
}