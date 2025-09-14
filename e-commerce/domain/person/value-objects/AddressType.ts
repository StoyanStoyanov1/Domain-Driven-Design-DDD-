import { ValueObject } from "../../shared/domain/ValueObject";
import { AddressTypeChoices, AddressTypeAsType } from "../types/";
import { Result } from "../../shared/core";

export class AddressType extends ValueObject<string> {
    static INVALID_ADDRESS_TYPE = `Address type must be one of: ${Object.values(AddressTypeChoices).join(", ")}`;
    static IS_VALID_ADDRESS_TYPE = (value: string) => Object.values(AddressTypeChoices).includes(value as AddressTypeAsType);

    protected validate(value: string): void {
        if (!value || !AddressType.IS_VALID_ADDRESS_TYPE(value)) {
            throw new Error(AddressType.INVALID_ADDRESS_TYPE);
        }

    }

    static create(value: string): Result<AddressType> {
        try {
            const addressType = new AddressType(value.trim().toLowerCase());
            return Result.ok(addressType);
        } catch (error) {
            return Result.fail<AddressType>(error.message);
        }
    }
}