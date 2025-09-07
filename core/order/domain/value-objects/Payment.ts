import { ValueObject } from "../../../shared/domain/valueObject";
import { PaymentType } from "../types";
import { IPayment } from "../interfaces";
import { paymentValidator } from "../utils";

export class Payment extends ValueObject<PaymentType.data> implements IPayment {
    static readonly MESSAGES = {
        // Method errors
        EMPTY_METHOD: 'Method cannot be empty',
        INVALID_METHOD: 'Method is not valid',
        // Status errors
        EMPTY_STATUS: 'Status cannot be empty',
        INVALID_STATUS: 'Status is not valid',
        // Transaction ID errors
        EMPTY_TRANSACTION_ID: 'Transaction ID cannot be empty',
        INVALID_TRANSACTION_ID: 'Transaction ID is not valid'
    } as const;

    constructor(data: PaymentType.data) {
        super(data);
    }

    static create(
        method: PaymentType.method,
        status: PaymentType.status,
        transactionId: PaymentType.transactionId
    ): Payment {
        return new Payment({ method, status, transactionId });
    }

    protected validate(value: PaymentType.data): void {
        if (!value.method || value.method.trim() === '') {
            throw new Error(Payment.MESSAGES.EMPTY_METHOD);
        }
        if (!paymentValidator.methodIsValid(value.method)) {
            throw new Error(Payment.MESSAGES.INVALID_METHOD);
        }

        if (!value.status || value.status.trim() === '') {
            throw new Error(Payment.MESSAGES.EMPTY_STATUS);
        }
        if (!paymentValidator.statusIsValid(value.status)) {
            throw new Error(Payment.MESSAGES.INVALID_STATUS);
        }

        if (!value.transactionId || value.transactionId.trim() === '') {
            throw new Error(Payment.MESSAGES.EMPTY_TRANSACTION_ID);
        }
    }

    get method(): PaymentType.method {
        return this.value.method;
    }

    get status(): PaymentType.status {
        return this.value.status;
    }

    get transactionId(): PaymentType.transactionId {
        return this.value.transactionId;
    }

    equals(other: Payment): boolean {
        return this.value.method === other.value.method &&
            this.value.status === other.value.status &&
            this.value.transactionId === other.value.transactionId;
    }

    toString(): string {
        return `Payment(${this.value.method}, ${this.value.status}, ${this.value.transactionId})`;
    }
}