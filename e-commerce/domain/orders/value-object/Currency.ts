import { Result } from "../../shared/core";
import {ValueObject} from "../../shared/domain/ValueObject";
import {currencyChoices} from "../enums";
export class Currency extends ValueObject<string>{
    static readonly IS_REQUIRED = 'Currency is required';
    static readonly MUST_BE_STRING = 'Currency must be a string';
    static readonly INVALID_CURRENCY = 'Invalid currency';

    constructor(value: string) {
        const normalizedValue = value.trim().toUpperCase();
        super(normalizedValue);
    }

    protected validate(value: string): void {
        if (!value) {
            throw new Error(Currency.IS_REQUIRED);
        }

        if (typeof value !== 'string') {
            throw new Error(Currency.MUST_BE_STRING);
        }

        if (!(value in currencyChoices)) {
            throw new Error(Currency.INVALID_CURRENCY);
        }
    }

    static create(currency: string): Result<Currency> {
        try {
            return Result.ok(new Currency(currency));
        } catch (error) {
            return Result.fail<Currency>(error.message);
        }
    }
}