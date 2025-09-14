import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/core";
import { validateUtils } from "../../shared/utils";

export class Apartment extends ValueObject<string> {
    static readonly CANT_BE_EMPTY = 'Apartment cannot be empty';
    static readonly INVALID_FORMAT = 'Invalid apartment format';

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(Apartment.CANT_BE_EMPTY);
        }
        if (!validateUtils.isValidApartment(value)) {
            throw new Error(Apartment.INVALID_FORMAT);
        }
    }

    static create(value: string): Result<Apartment> {
        try {
            return Result.ok(new Apartment(value.trim()));
        } catch (error) {
            return Result.fail(error.message);
        }
    }
}