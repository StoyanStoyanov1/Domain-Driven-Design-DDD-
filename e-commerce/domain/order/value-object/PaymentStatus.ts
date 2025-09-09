import { ValueObject } from "../../shared/domain/ValueObject";
import { paymentStatusChoices } from "../enums";

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

}