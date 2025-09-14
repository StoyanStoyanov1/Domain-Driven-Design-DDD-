import { ValueObject } from "../../shared/domain/ValueObject";
import {Result} from "../../shared/core";
import {generateId} from "../../shared/utils";

export class PersonId extends ValueObject<string> {
    static readonly CANT_BE_EMPTY = 'PersonId cannot be empty';

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(PersonId.CANT_BE_EMPTY);
        }
    }

    static create(): Result<PersonId> {
       try {
           return Result.ok<PersonId>(new PersonId(generateId()));
       } catch (error) {
           return Result.fail<PersonId>(error.message);
       }
    }
}