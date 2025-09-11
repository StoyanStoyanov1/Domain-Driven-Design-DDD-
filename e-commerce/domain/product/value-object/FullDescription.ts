import {ValueObject} from "../../shared/domain/ValueObject";
import {Result} from "../../shared/core";

export class FullDescription extends ValueObject<string>{
    static readonly MIN_LENGTH = 50;
    static readonly MAX_LENGTH = 1000;

    static readonly CANT_BE_EMPTY_ERROR = 'Full description cannot be empty';
    static readonly MIN_LENGTH_ERROR = `Full description must be at least ${FullDescription.MIN_LENGTH} characters long`;
    static readonly MAX_LENGTH_ERROR = `Full description must be at most ${FullDescription.MAX_LENGTH} characters long`;

    constructor(value: string) {
        super(value);
    }

    protected validate(value: string): void {
        if (!value) {
            throw new Error(FullDescription.CANT_BE_EMPTY_ERROR);
        }

        if (value.length < FullDescription.MIN_LENGTH) {
            throw new Error(FullDescription.MIN_LENGTH_ERROR);
        }
        if (value.length > FullDescription.MAX_LENGTH) {
            throw new Error(FullDescription.MAX_LENGTH_ERROR);
        }
    }

    static create(value: string): Result<FullDescription> {
        try {
            const fullDescription = new FullDescription(value);
            return Result.ok<FullDescription>(fullDescription);
        } catch (error) {
            return Result.fail<FullDescription>(error.message);
        }
    }
}