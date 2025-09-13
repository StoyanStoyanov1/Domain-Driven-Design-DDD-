import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/core";
import { AvatarFormatExtensions, AvatarFormatExtensionType} from "../types/";

export class Avatar extends ValueObject<string> {
    static readonly INVALID_FORMAT_ERROR = 'Invalid avatar format.';
    static readonly CANT_BE_EMPTY = 'Avatar cannot be empty';
    static readonly ALLOWED_FORMATS = Object.keys(AvatarFormatExtensions).join(", ");

    protected validate(value: string): void {
        if (!value || value.trim() === "") {
            throw new Error(Avatar.CANT_BE_EMPTY
            );
        }

        const rawExt = value.split(".").pop()?.toLowerCase();
        if (!rawExt) {
            throw new Error(Avatar.INVALID_FORMAT_ERROR);
        }

        const normalizedExt = AvatarFormatExtensions[rawExt as keyof typeof AvatarFormatExtensionType];
        if (!normalizedExt) {
            throw new Error(
                `${Avatar.INVALID_FORMAT_ERROR} Allowed: ${Avatar.ALLOWED_FORMATS}`
            );
        }
    }

    static create(value: string): Result<Avatar> {
        try {
            return Result.ok(new Avatar(value.trim()));
        } catch (error: any) {
            return Result.fail(error.message);
        }
    }
}
