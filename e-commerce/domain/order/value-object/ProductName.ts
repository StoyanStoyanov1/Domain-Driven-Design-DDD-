import { Result } from "../../shared/core";
import {ValueObject} from "../../shared/domain/ValueObject";

export class ProductName extends ValueObject<string>{
    static readonly CANT_BE_EMPTY = 'Product name cannot be empty';

    constructor(value: string) {
        super(value);
    }

    protected validate(value: string) {
        if (!value || value.trim()=== '') {
            throw new Error(ProductName.CANT_BE_EMPTY);
        }
    }

    static create(value: string): Result<ProductName> {
        try {
            return Result.ok(new ProductName(value));
        } catch (error) {
            return Result.fail<ProductName>(error.message);
        }
    }
}