import { ValueObject } from "../../shared/domain/ValueObject";
import { PaymentMethodChoices, PaymentMethodType } from "../types";
import { Result } from "../../shared/core";

export class PaymentStatus extends ValueObject<string> {
    static readonly IS_REQUIRED = 'Payment status is required!';
    static readonly INVALID_STATUS = 'Invalid payment status';

    private constructor(value: string) {
        const normalizedValue = value.trim().toUpperCase();
        super(normalizedValue);

    }

    protected validate(value: string): void {

        if (!value) {
            throw new Error(PaymentStatus.IS_REQUIRED);
        }

        const paymentStatusIsValid = Object.values(PaymentMethodChoices).includes(value as PaymentMethodType);
        if (!paymentStatusIsValid) {
            throw new Error(`${PaymentStatus.INVALID_STATUS}: ${value}`);
        }
    }

    static create(value: string): Result<PaymentStatus> {
        try {
            return Result.ok<PaymentStatus>(new PaymentStatus(value));
        } catch (error) {
            return Result.fail<PaymentStatus>(error.message);
        }
    }

}