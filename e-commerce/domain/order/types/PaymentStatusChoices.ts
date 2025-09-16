export const PaymentStatusChoices = {
    PENDING: 'PENDING',
    PAID: 'PAID',
    FAILED: 'FAILED',
    REFUNDED: 'REFUNDED',
    CANCELLED: 'CANCELLED'
} as const;

export type PaymentStatusChoices = typeof PaymentStatusChoices[keyof typeof PaymentStatusChoices];