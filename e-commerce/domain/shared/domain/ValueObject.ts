import { IValueObject } from "./IValueObject";

export abstract class ValueObject<T> implements IValueObject<T> {
    protected readonly value: T;

    constructor(value: T) {
        this.validate(value);
        this.value = value;
    }

    protected abstract validate(value: T): void;

    getValue(): T {
        return this.value;
    }

    equals(other: ValueObject<T>): boolean {
        if (!(other instanceof this.constructor)) {
            return false;
        }
        return this.value === other.value;
    }

    toString(): string {
        return String(this.value);
    }
}