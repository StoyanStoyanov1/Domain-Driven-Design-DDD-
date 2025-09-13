import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/core/Result";

export class PhoneNumber extends ValueObject<string> {
    static readonly CANT_BE_EMPTY = 'Phone number cannot be empty';
    static readonly INVALID_FORMAT = 'Invalid phone number format';

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(PhoneNumber.CANT_BE_EMPTY);
        }
        if (!/^\+\d{1,3}\d{9,12}$/.test(value)) {
            throw new Error(PhoneNumber.INVALID_FORMAT);
        }
    }

    static create(value: string): Result<PhoneNumber> {
        try {
            return Result.ok(new PhoneNumber(value.trim()));
        } catch (error) {
            return Result.fail(error.message);
        }
    }
}