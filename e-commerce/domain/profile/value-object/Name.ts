import { ValueObject } from "../../shared/domain/ValueObject";
import { NameType } from "../types";
import { Result } from "../../shared/core/Result";
export class Name extends ValueObject<NameType> {
    private readonly firstName: string;
    private readonly middleName?: string;
    private readonly lastName: string;

    constructor(firstName: string, lastName: string, middleName?: string) {
        super({ firstName, middleName, lastName });
    }

    protected validate(value: NameType): void {
        if (!value.firstName || value.firstName.trim() === '') {
            throw new Error('First name cannot be empty');
        }
        if (!value.lastName || value.lastName.trim() === '') {
            throw new Error('Last name cannot be empty');
        }
    }

      public static create(obj: NameType): Result<Name> {
        try {
            return Result.ok<Name>(new Name(obj.firstName, obj.lastName, obj.middleName));
        } catch (error) {
            return Result.fail<Name>(error.message);
        }
    }

    getFullName(): string {
        return this.middleName
            ? `${this.firstName} ${this.middleName} ${this.lastName}`
            : `${this.firstName} ${this.lastName}`;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getMiddleName(): string | undefined {
        return this.middleName;
    }

}