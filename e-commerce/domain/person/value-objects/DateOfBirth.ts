import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/core";

export class DateOfBirth extends ValueObject<Date> {
    static readonly MIN_YEARS_OLD = 16;

    static readonly INVALID_DATE_ERROR = 'Invalid date';
    static readonly FUTURE_DATE_ERROR = 'Date of birth cannot be in the future';
    static readonly UNDERAGE_ERROR = 'User must be at least 16 years old';

    protected validate(value: Date): void {
        if (!(value instanceof Date) || isNaN(value.getTime())) {
            throw new Error(DateOfBirth.INVALID_DATE_ERROR);
        }
        const today = new Date();
        if (value >= today) {
            throw new Error(DateOfBirth.FUTURE_DATE_ERROR);
        }
        if (
            today.getFullYear() - value.getFullYear() < DateOfBirth.MIN_YEARS_OLD ||
            (
                today.getFullYear() - value.getFullYear() === DateOfBirth.MIN_YEARS_OLD &&
                (today.getMonth() < value.getMonth() ||
                    (today.getMonth() === value.getMonth() && today.getDate() < value.getDate()))
            )
        ) {
            throw new Error(DateOfBirth.UNDERAGE_ERROR);
        }
    }

    public static create(dateString: string): Result<DateOfBirth> {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return Result.fail<DateOfBirth>(DateOfBirth.INVALID_DATE_ERROR);
            }
            const dateOfBirth = new DateOfBirth(date);
            return Result.ok<DateOfBirth>(dateOfBirth);
        } catch (error) {
            return Result.fail<DateOfBirth>(error.message);
        }
    }
}