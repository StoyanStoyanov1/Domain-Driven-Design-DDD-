export const OrderStatusChoices = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    PROCESSING: 'PROCESSING',
    SHIPPED: 'SHIPPED',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED',
    RETURNED: 'RETURNED',
    OPEN: 'OPEN'
} as const;

export type OrderStatusChoices = typeof OrderStatusChoices[keyof typeof OrderStatusChoices];