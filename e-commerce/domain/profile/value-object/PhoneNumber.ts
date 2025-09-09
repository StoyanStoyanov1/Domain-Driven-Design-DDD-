import { ValueObject } from '../../shared/domain/ValueObject';

export class PhoneNumber extends ValueObject<string> {
    private readonly value: string;

    constructor(props: string) {
        super(props);
        this.value = props;
        this.validate(this.value);
    }

    public getValue(): string {
        return this.value;
    }

    protected validate(value: string): void {
        const phoneRegex = /^\+?\d{9,15}$/;
        if (!phoneRegex.test(value)) {
            throw new Error('Invalid phone number format');
        }
    }
}