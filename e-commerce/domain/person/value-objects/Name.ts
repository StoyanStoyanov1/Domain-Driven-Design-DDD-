import { ValueObject } from "../../shared/domain/ValueObject";

export class Name extends ValueObject<string> {
    static readonly MIN_LENGTH = 2;
    static readonly MAX_LENGTH = 30;
    static readonly EMPTY_NAME_ERROR = 'Name cannot be empty';
    static readonly INVALID_LENGTH_ERROR = `Name must be between ${Name.MIN_LENGTH} and ${Name.MAX_LENGTH} characters`;
    static readonly INVALID_CHARACTERS_ERROR = 'Name must contain only letters';

    protected validate(value: string): void {
        if (!value) {
            throw new Error(Name.EMPTY_NAME_ERROR);
        }
        if (value.length < Name.MIN_LENGTH || value.length > Name.MAX_LENGTH) {
            throw new Error(Name.INVALID_LENGTH_ERROR);
        }
        if (value.trim().length === 0) {
            throw new Error(Name.EMPTY_NAME_ERROR);
        }

        const isOnlyLetters = /^[A-Za-z]+$/.test(value);
        if (!isOnlyLetters) {
            throw new Error(Name.INVALID_CHARACTERS_ERROR);
        }
    }

    static create(value: string): Name {
        const capitalizedValue = value.trim().charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return new Name(capitalizedValue);
    }

}