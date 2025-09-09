import {ValueObject} from "../../shared/domain/ValueObject";
import {CurrencyType} from "../types";

export class Currency extends ValueObject<string>{
    constructor(value: string) {
        const normalizedValue = value.trim().toUpperCase();
        super(normalizedValue);
    }

    protected validate(value: string): void {
        if (!value) {
            throw new Error('Currency is required');
        }

        if (!(value in CurrencyType)) {
            throw new Error('Invalid currency');
        }
    }
}