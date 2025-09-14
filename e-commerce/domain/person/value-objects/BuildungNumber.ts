import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/core";
import { validateUtils } from "../../shared/utils";

export class BuildingNumber extends ValueObject<string> {
    static readonly CANT_BE_EMPTY = 'Building number cannot be empty';
    static readonly INVALID_FORMAT = 'Invalid building number format';

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(BuildingNumber.CANT_BE_EMPTY);
        }
        if (!validateUtils.isValidBuildingNumber(value)) {
            throw new Error(BuildingNumber.INVALID_FORMAT);
        }
    }

    static create(value: string): Result<BuildingNumber> {
        try {
            return Result.ok(new BuildingNumber(value.trim()));
        } catch (error) {
            return Result.fail(error.message);
        }
    }
}