import {PaymentType} from "../../types";

function methodIsValid(method: string): boolean{
    const possibleMethods: PaymentType.method[] = ['creditCard', 'debitCard', 'cash'];
    return possibleMethods.indexOf(method) !== -1;
}

function statusIsValid(status: string): boolean {
    const possibleStatuses: PaymentType.status[] = ['pending', 'completed', 'failed'];
    return possibleStatuses.indexOf(status) !== -1;
}

export namespace paymentValidator {
    export const methodIsValid = methodIsValid;
    export const statusIsValid = statusIsValid;
}

