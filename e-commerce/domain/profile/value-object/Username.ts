import { Result } from '../../shared/core';
import { ValueObject } from '../../shared/domain/ValueObject';

export class Username extends ValueObject<string> {

    constructor(value: string) {
        const trimmedValue = value;
        super(trimmedValue);
        this.value = trimmedValue;
    }

    public getValue(): string {
        return this.value;
    }

    protected validate(value: string): void {
        if (value.length < 3 || value.length > 12) {
            throw new Error('Username must be between 3 and 12 characters');
        }

        if (value.includes(' ')) {
            throw new Error('Username cannot contain spaces');
        }

        const usernameRegex = /^[a-zA-Z0-9_-]+$/;
        if (!usernameRegex.test(value)) {
            throw new Error('Username can only contain letters, numbers, underscore and dash');
        }
    }

    static create(username: string): Result<Username> {
        try {
            return Result.ok(new Username(username));
        } catch (error) {
            return Result.fail<Username>(error.message);
        }
    }
}
