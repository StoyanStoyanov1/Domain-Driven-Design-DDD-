import { PaymentType } from "../types";

export interface IPayment {
    method: PaymentType.method;
    status: PaymentType.status;
    transactionId: PaymentType.transactionId;
}

