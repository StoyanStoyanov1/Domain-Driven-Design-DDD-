import { ValueObject } from "../../shared/domain/ValueObject";
import { GenderChoices, GenderChoicesType } from "../types";
import { Result } from "../../shared/core";

export class Gender extends ValueObject<string> {
    static readonly INVALID_GENDER_ERROR = 'Invalid gender';

    protected validate(value: string): void {
        if (!value || 
            value.trim() === '' || 
            !Object.values(GenderChoices).includes(value as GenderChoicesType)) {
            throw new Error(Gender.INVALID_GENDER_ERROR);
        }
    }

    static create(value: string): Result<Gender> {
        try {
            return Result.ok(new Gender(value));
        } catch (error) {
            return Result.fail(error.message);
        }
    }
}