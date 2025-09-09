import { ValueObject } from '../../shared/domain/ValueObject';

export class PhoneNumber extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.validate(value);
    }

    public getValue(): string {
        return this.value;
    }

    protected validate(value: string): void {
        if (!value?.trim()) {
            throw new Error('Phone number is required');
        }

        const normalized = value.replace(/[\s\-\(\)\.]/g, '');

        const phoneRegex = /^\+?[1-9]\d{7,14}$/;

        if (!phoneRegex.test(normalized)) {
            throw new Error('Invalid phone number format. Expected 8-15 digits with optional + prefix');
        }

        this.value = normalized;
    }
}