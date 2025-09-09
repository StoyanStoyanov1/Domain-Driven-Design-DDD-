import {ValueObject} from "../../shared/domain/ValueObject";

export class Email extends ValueObject<string>{
    private readonly value: string;

    static readonly ERROR_MESSAGE_VALUE_IS_EMPTY = 'Email cannot be empty';
    static readonly ERROR_MESSAGE_VALUE_IS_TOO_LONG = 'Email is too long';
    static readonly ERROR_MESSAGE_VALUE_IS_CONSECUTIVE_DOTS = 'Email cannot contain consecutive dots';
    static readonly ERROR_MESSAGE_VALUE_IS_INVALID = 'Invalid email format';

    constructor(props: string) {
        super(props);
        this.validate(props);
        this.value = props;
    }

    public getValue(): string {
        return this.value;
    }

    protected validate(value: string): void {
        if (!value || value.trim().length === 0) {
            throw new Error(Email.ERROR_MESSAGE_VALUE_IS_EMPTY);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error(Email.ERROR_MESSAGE_VALUE_IS_INVALID);
        }

        if (value.length > 50) {
            throw new Error(Email.ERROR_MESSAGE_VALUE_IS_TOO_LONG);
        }

        if (value.includes('..')) {
            throw new Error(Email.ERROR_MESSAGE_VALUE_IS_CONSECUTIVE_DOTS);
        }
    }
}
