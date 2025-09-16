import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/core";

export class Note extends ValueObject<string> {
    static readonly MAX_LENGTH = 500;
    static readonly MIN_LENGTH = 10;

    static readonly IS_REQUIRED = 'Note is required';
    static readonly MAX_LENGTH_EXCEEDED = `Note cannot exceed ${Note.MAX_LENGTH} characters`;
    static readonly MIN_LENGTH_NOT_MET = `Note must be at least ${Note.MIN_LENGTH} characters`;

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(Note.IS_REQUIRED);
        }
        if (value.length > Note.MAX_LENGTH) {
            throw new Error(Note.MAX_LENGTH_EXCEEDED);
        }
        if (value.length < Note.MIN_LENGTH) {
            throw new Error(Note.MIN_LENGTH_NOT_MET);
        }
    }

    static create(value: string): Result<Note> {
        try {
            return Result.ok(new Note(value));
        } catch (error) {
            return Result.fail(error.message);
        }
    }
}