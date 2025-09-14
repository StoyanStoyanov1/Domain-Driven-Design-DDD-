import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/core";
import { validateUtils } from "../../shared/utils/";

export class Username extends ValueObject<string> {
    static readonly MIN_LENGTH = 3;
    static readonly MAX_LENGTH = 30;
    static readonly CANT_BE_EMPTY = 'Username cannot be empty';
    static readonly INVALID_LENGTH = `Username must be between ${Username.MIN_LENGTH} and ${Username.MAX_LENGTH} characters`;
    static readonly INVALID_CHARACTERS = 'Username can only contain lowercase letters, numbers, dots, and underscores';

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(Username.CANT_BE_EMPTY);
        }
        if (value.length < Username.MIN_LENGTH || value.length > Username.MAX_LENGTH) {
            throw new Error(Username.INVALID_LENGTH);
        }

        if (!validateUtils.isValidUsername(value)) {
            throw new Error(Username.INVALID_CHARACTERS);
        }
    }

    static create(value: string): Result<Username> {
        try {
            return Result.ok(new Username(value.trim().toLowerCase()));
        } catch (error) {
            return Result.fail(error.message);
        }
    }
}
