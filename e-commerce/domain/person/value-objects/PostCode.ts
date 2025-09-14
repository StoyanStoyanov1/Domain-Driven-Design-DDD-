import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/core";
import { validateUtils } from "../../shared/utils";

export class PostCode extends ValueObject<string> {
    static readonly CANT_BE_EMPTY = 'Postcode cannot be empty';
    static readonly INVALID_FORMAT = 'Invalid postcode format';

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(PostCode.CANT_BE_EMPTY);
        }
        if (!validateUtils.isValidPostcode(value)) {
            throw new Error(PostCode.INVALID_FORMAT);
        }
    }

    static create(value: string): Result<PostCode> {
        try {
            return Result.ok(new PostCode(value.trim()));
        } catch (error) {
            return Result.fail(error.message);
        }
    }
}