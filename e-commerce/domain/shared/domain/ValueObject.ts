import {ProfileId} from "../../profile/value-object";

export abstract class ValueObject<T> {
    protected value: T;

    constructor(value: T) {  // T вместо Т (кирилица)
        this.validate(value);
        this.value = value;
    }

    protected abstract validate(value: T): void;

    public getValue(): T {
        return this.value;
    }

    public equals(other: ValueObject<T>): boolean {
        if (!(other instanceof this.constructor)) {
            return false;
        }
        return this.value === other.value;
    }

    public toString(): string {
        return String(this.value);
    }
}