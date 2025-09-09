import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/core/Result";

export class ProfileId extends ValueObject<string> {
    static readonly ERROR_MESSAGE_VALUE_IS_EMPTY = 'Id cannot be empty';

    constructor(id: ProfileId) {
        super(id);
    }

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(ProfileId.ERROR_MESSAGE_VALUE_IS_EMPTY);
        }
    }

    get id(): string {
        return this.getValue();
    }

    public static create(id: string): Result<ProfileId> {
        try {
            const profileId = new ProfileId(id);
            return Result.ok<ProfileId>(profileId);
        } catch (error) {
            return Result.fail<ProfileId>(error.message);
        }
    }
}