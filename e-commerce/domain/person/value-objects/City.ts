import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/core";
import { validateUtils } from "../../shared/utils/";

export class City extends ValueObject<string> {
    static INVALID_CITY = "City name cannot be empty.";

    protected validate(value: string): void {
        if (!value || value.trim().length === 0 || !validateUtils.isOnlyLetters(value.trim())) {
            throw new Error(City.INVALID_CITY);
        }
    }

    static create(value: string): Result<City> {
        try {
            const city = new City(value.trim());
            return Result.ok(city);
        } catch (error) {
            return Result.fail<City>(error.message);
        }
    }
}