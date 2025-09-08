import { ComplexValueObject } from "../../shared/domain/ComplexValueObject";
import { NameProps } from "../types";

export class Name extends ComplexValueObject<NameProps> {
    private readonly firstName: string;
    private readonly middleName?: string;
    private readonly lastName: string;

    constructor(firstName: string, lastName: string, middleName?: string) {
        super({ firstName, middleName, lastName });
    }

    protected validate(value: NameProps): void {
        if (!value.firstName || value.firstName.trim() === '') {
            throw new Error('First name cannot be empty');
        }
        if (!value.lastName || value.lastName.trim() === '') {
            throw new Error('Last name cannot be empty');
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