type method = 'creditCard' | 'debitCard' | 'cash';
type status = 'pending' | 'paid' | 'canceled';
type transactionId = string;

export namespace PaymentType {
    export type method = method;
    export type status = status;
    export type transactionId = transactionId;
    export type data = {
        readonly method: PaymentType.method;
        readonly status: PaymentType.status;
        readonly transactionId: PaymentType.transactionId;
    }
}