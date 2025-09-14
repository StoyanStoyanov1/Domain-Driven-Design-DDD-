import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/core";
import { validateUtils } from "../../shared/utils/";

export class Country extends ValueObject<string> {
    static INVALID_COUNTRY = "Country name cannot be empty.";

    protected validate(value: string): void {
        if (!value || value.trim().length === 0 || !validateUtils.isOnlyLetters(value.trim())) {
            throw new Error(Country.INVALID_COUNTRY);
        }
    }

    static create(value: string): Result<Country> {
        try {
            const country = new Country(value.trim());
            return Result.ok(country);
        } catch (error) {
            return Result.fail<Country>(error.message);
        }
    }
}