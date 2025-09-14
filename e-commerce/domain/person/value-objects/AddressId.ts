import { ValueObject } from "../../shared/domain/ValueObject";
import {Result} from "../../shared/core";
import {generateId} from "../../shared/utils";

export class AddressId extends ValueObject<string> {
    static readonly CANT_BE_EMPTY = 'AddressId cannot be empty';

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(AddressId.CANT_BE_EMPTY);
        }
    }

    static create(): Result<AddressId> {
       try {
           return Result.ok<AddressId>(new AddressId(generateId()));
       } catch (error) {
           return Result.fail<AddressId>(error.message);
       }
    }
}