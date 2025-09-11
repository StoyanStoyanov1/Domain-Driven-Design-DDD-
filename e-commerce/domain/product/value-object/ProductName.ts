import { ValueObject} from "../../shared/domain/ValueObject";
import {Result} from "../../shared/core";

class ProductName extends ValueObject<string>{
    static readonly MIN_LENGTH = 3;
    static readonly MAX_LENGTH = 30;

    static readonly CANT_BE_EMPTY_ERROR = 'Product name cannot be empty';
    static readonly MIN_LENGTH_ERROR = `Product name must be at least ${ProductName.MIN_LENGTH} characters long`;
    static readonly MAX_LENGTH_ERROR = `Product name must be at most ${ProductName.MAX_LENGTH} characters long`;

    constructor(value: string) {
        super(value);
    }

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(ProductName.CANT_BE_EMPTY_ERROR);
        }

        if (value.length < ProductName.MIN_LENGTH) {
            throw new Error(ProductName.MIN_LENGTH_ERROR);
        }

        if (value.length > ProductName.MAX_LENGTH) {
            throw new Error(ProductName.MAX_LENGTH_ERROR);
        }
    }

    static create(value: string): Result<ProductName> {
        try {
            const productName = new ProductName(value);
            return Result.ok<ProductName>(productName);
        } catch (error) {
            return Result.fail<ProductName>(error.message);
        }
    }
}