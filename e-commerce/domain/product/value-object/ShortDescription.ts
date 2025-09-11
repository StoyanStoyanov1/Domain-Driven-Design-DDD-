import {ValueObject} from "../../shared/domain/ValueObject";
import {Result} from "../../shared/core";

export class ShortDescription extends ValueObject<string>{
    static readonly MIN_LENGTH = 20;
    static readonly MAX_LENGTH = 200;

    static readonly CANT_BE_EMPTY_ERROR = 'Short description cannot be empty';
    static readonly MIN_LENGTH_ERROR = `Short description must be at least ${ShortDescription.MIN_LENGTH} characters long`;
    static readonly MAX_LENGTH_ERROR = `Short description must be at most ${ShortDescription.MAX_LENGTH} characters long`;

    constructor(value:string) {
        super(value);
    }

    protected validate(value: string): void {
        if (!value) {
            throw new Error(ShortDescription.CANT_BE_EMPTY_ERROR);
        }
        if (value.length < ShortDescription.MIN_LENGTH) {
            throw new Error(ShortDescription.MIN_LENGTH_ERROR);
        }
        if (value.length > ShortDescription.MAX_LENGTH) {
            throw new Error(ShortDescription.MAX_LENGTH_ERROR);
        }
    }

    static create(value: string): Result<ShortDescription> {
        try {
            const shortDescription = new ShortDescription(value);
            return Result.ok<ShortDescription>(shortDescription);
        } catch (error) {
            return Result.fail<ShortDescription>(error.message);
        }
    }
}