import { ValueObject } from "../../shared/domain/ValueObject";
import {Result} from "../../shared/core";
import {generateId} from "../../shared/utils";

export class BankCardId extends ValueObject<string> {
    static readonly CANT_BE_EMPTY = 'BankCardId cannot be empty';

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(BankCardId.CANT_BE_EMPTY);
        }
    }

    static create(): Result<BankCardId> {
       try {
           return Result.ok<BankCardId>(new BankCardId(generateId()));
       } catch (error) {
           return Result.fail<BankCardId>(error.message);
       }
    }
}