import { Result } from "../../shared/core";
import { ValueObject } from "../../shared/domain/ValueObject";
import { PaymentMethodChoices, PaymentMethodType } from "../types";

export class PaymentMethod extends ValueObject<string> {
    static readonly METHOD_IS_REQUIRED = 'Method is required!'
    static readonly INVALID_METHOD = 'Invalid payment method'

    private constructor(value: string) {
        const normalizedValue = value.trim().toUpperCase();
        super(normalizedValue);
    }

    protected validate(value: string): void {
        
        if (!value) {
            throw new Error(PaymentMethod.METHOD_IS_REQUIRED);
        }
        const paymentMethodIsValid: boolean = Object.values(PaymentMethodChoices).includes(value as PaymentMethodType);
        if (!paymentMethodIsValid) {
            throw new Error(PaymentMethod.INVALID_METHOD + ':' + value);
        }
    }

    static create(value: string): Result<PaymentMethod> {
        try {
            return Result.ok(new PaymentMethod(value.trim()));
        } catch (error) {
            return Result.fail<PaymentMethod>(error.message);
        }
    }
}