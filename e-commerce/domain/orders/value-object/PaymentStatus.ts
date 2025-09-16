import { ValueObject } from "../../shared/domain/ValueObject";
import { paymentStatusChoices } from "../enums";
import { Result } from "../../shared/core";

export class PaymentStatus extends ValueObject<string> {
    private constructor(value: string) {
        const normalizedValue = value.trim().toUpperCase();
        super(normalizedValue);

    }

    protected validate(value: string): void {

        if (!value) {
            throw new Error('Payment status is required');
        }
        const paymentStatusChoicesArray: string[] = Object.values(paymentStatusChoices);
        if (!paymentStatusChoicesArray.includes(value)) {
            throw new Error(`Invalid payment status: ${value}`);
        }
    }

    static create(value: string): Result<PaymentStatus> {
        try {
            return Result.ok<PaymentStatus>(new PaymentStatus(value));
        } catch (error) {
            return Result.fail<PaymentStatus>(error.message);
        }
    }

    // Factory methods for each payment status

    static pending()   { return new PaymentStatus(paymentStatusChoices.PENDING); }
    static paid()      { return new PaymentStatus(paymentStatusChoices.PAID); }
    static failed()    { return new PaymentStatus(paymentStatusChoices.FAILED); }
    static cancelled() { return new PaymentStatus(paymentStatusChoices.CANCELLED); }
    static refunded()  { return new PaymentStatus(paymentStatusChoices.REFUNDED); }

}