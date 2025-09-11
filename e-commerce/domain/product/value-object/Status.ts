import { ValueObject } from "../../shared/domain/ValueObject";
import { StatusChoices } from "../types";
import { Result } from "../../shared/core";

export class Status extends ValueObject<StatusChoices> {
    static readonly CANT_BE_EMPTY = 'Status cannot be empty';
    static readonly INVALID_STATUS = 'Invalid status';

    constructor(value: StatusChoices) {
        super(value);
    }

    protected validate(value: StatusChoices): void {
        if (!value) {
            throw new Error(Status.CANT_BE_EMPTY);
        }

        if (!Status.statusISValid(value)) {
            throw new Error(`${Status.INVALID_STATUS}: ${value}`);
        }
    }

    static statusISValid(value: string): boolean {
        return (Object.values(StatusChoices)).includes(value as StatusChoices);
    }

    static create(value: StatusChoices): Result<Status> {
        try {
            const status = new Status(value);
            return Result.ok<Status>(status);
        } catch (error) {
            return Result.fail<Status>(error.message);
        }
    }
}
