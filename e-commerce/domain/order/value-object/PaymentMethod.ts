import { Result } from "../../shared/core";
import { ValueObject } from "../../shared/domain/ValueObject";
import { paymentMethodChoices } from "../enums";

export class PaymentMethod extends ValueObject<string> {
    private constructor(value: string) {
        const normalizedValue = value.trim().toUpperCase();
        super(normalizedValue);

    }

    protected validate(value: string): void {

        if (!value) {
            throw new Error('Payment method is required');
        }
        const paymentMethodChoicesArray: string[] = Object.values(paymentMethodChoices);
        if (!paymentMethodChoicesArray.includes(value)) {
            throw new Error(`Invalid payment method: ${value}`);
        }
    }

    static create(value: string): Result<PaymentMethod> {
        try {
            return Result.ok(new PaymentMethod(value));
        } catch (error) {
            return Result.fail<PaymentMethod>(error.message);
        }
    }
}