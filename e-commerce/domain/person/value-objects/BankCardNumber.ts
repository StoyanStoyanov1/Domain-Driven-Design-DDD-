import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/core";
import { validateUtils } from "../../shared/utils";

export class BankCardNumber extends ValueObject<string> {
    static readonly CANT_BE_EMPTY = 'Bank card number cannot be empty';
    static readonly INVALID_FORMAT = 'Invalid bank card number format';

    protected validate(value: string): void {
        if (!value || value.trim() === "") {
            throw new Error(BankCardNumber.CANT_BE_EMPTY);
        }

        if (!validateUtils.isvalidCardNumber(value)) {
            throw new Error(BankCardNumber.INVALID_FORMAT);
        }
    }

    static create(value: string): Result<BankCardNumber> {
        try {
            return Result.ok(new BankCardNumber(value.trim()));
        } catch (error: any) {
            return Result.fail(error.message);
        }
    }
}
