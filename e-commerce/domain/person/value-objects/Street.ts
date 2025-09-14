import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/core";
import { validateUtils } from "../../shared/utils";

export class Street extends ValueObject<string> {
    static readonly CANT_BE_EMPTY = 'Street cannot be empty';
    static readonly INVALID_FORMAT = 'Invalid street format';

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(Street.CANT_BE_EMPTY);
        }
        if (!validateUtils.isValidStreet(value)) {
            throw new Error(Street.INVALID_FORMAT);
        }
    }

    static create(value: string): Result<Street> {
        try {
            return Result.ok(new Street(value.trim()));
        } catch (error) {
            return Result.fail(error.message);
        }
    }
}

