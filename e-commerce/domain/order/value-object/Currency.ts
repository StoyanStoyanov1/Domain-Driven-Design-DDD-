import { Result } from "../../shared/core";
import {ValueObject} from "../../shared/domain/ValueObject";
import {CurrencyChoices, CurrencyType} from "../types";
export class Currency extends ValueObject<string>{
    static readonly IS_REQUIRED = 'Currency is required';
    static readonly INVALID_CURRENCY = 'Invalid currency';

    constructor(value: string) {
        const normalizedValue = value.trim().toUpperCase();
        super(normalizedValue);
    }

    protected validate(value: string): void {
        if (!value) {
            throw new Error(Currency.IS_REQUIRED);
        }

        const currencyIsValid = Object.values(CurrencyChoices).includes(value as CurrencyType);

        if (currencyIsValid) {
            throw Error(Currency.INVALID_CURRENCY);
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