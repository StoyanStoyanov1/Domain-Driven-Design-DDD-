import { ValueObject} from "../../shared/domain/ValueObject";
import {Result} from "../../shared/core";

export class Sku extends ValueObject<string> {
    static readonly CANT_BE_EMPTY = 'SKU cannot be empty';

    constructor(value: string) {
        super(value);
    }

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(Sku.CANT_BE_EMPTY);
        }
    }

    static create(value: string): Result<Sku> {
        try {
            const sku = new Sku(value);
            return Result.ok<Sku>(sku);
        } catch (error) {
            return Result.fail<Sku>(error.message);
        }
    }

}