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
}