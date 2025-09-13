import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/core";
import { AvatarFormatExtensions, AvatarFormatExtensionType} from "../types/";

export class Avatar extends ValueObject<string> {
    protected validate(value: string): void {
        if (!value || value.trim() === "") {
            throw new Error("Avatar cannot be empty");
        }

        const rawExt = value.split(".").pop()?.toLowerCase();
        if (!rawExt) {
            throw new Error("Avatar must have an extension");
        }

        const normalizedExt = AvatarFormatExtensions[rawExt as keyof typeof AvatarFormatExtensionType];
        if (!normalizedExt) {
            throw new Error(
                `Invalid avatar format. Allowed: ${Object.keys(AvatarFormatExtensions).join(", ")}`
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
