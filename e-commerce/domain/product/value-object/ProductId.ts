import { ValueObject } from "../../shared/domain/ValueObject";

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
}