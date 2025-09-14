import { ValueObject } from "../../shared/domain/ValueObject";
import { BankCardTypeChoices, BankCartTypeChoicesType } from "../types";
import { Result } from "../../shared/core";

export class BankCardType extends ValueObject<string> {
    static readonly CANT_BE_EMPTY = 'Bank card type cannot be empty';
    static readonly INVALID_TYPE = 'Invalid bank card type';

    protected validate(value: string): void {
        if (!value || value.trim() === "") {
            throw new Error(BankCardType.CANT_BE_EMPTY);
        }

        if (!BankCardTypeChoices[value as BankCartTypeChoicesType]) {
            throw new Error(`${BankCardType.INVALID_TYPE}. Allowed types are: ${Object.keys(BankCardTypeChoices).join(", ")}`);
        }
    }

    static create(value: string): Result<BankCardType> {
        try {
            return Result.ok(new BankCardType(value.trim()));
        } catch (error: any) {
            return Result.fail(error.message);
        }
    }
}