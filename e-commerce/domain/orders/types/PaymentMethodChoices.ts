export const PaymentMethodChoices = {
    CREDIT_CARD: 'CREDIT CARD',
    DEBIT_CARD: 'DEBIT CARD',
    PAYPAL: 'PAYPAL',
    BANK_TRANSFER: 'BANK TRANSFER',
    CASH_ON_DELIVERY: 'CASH ON DELIVERY',
    APPLE_PAY: 'APPLE PAY',
    GOOGLE_PAY: 'GOOGLE PAY',
    CRYPTOCURRENCY: 'CRYPTOCURRENCY'
} as const;

export type PaymentMethodChoices = typeof PaymentMethodChoices[keyof typeof PaymentMethodChoices];
