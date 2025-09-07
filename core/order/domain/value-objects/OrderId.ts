import { ValueObject } from '../../../shared/domain/valueObject';

export class OrderId extends ValueObject<string> {
    private static readonly ORDER_ID_PREFIX = 'ORD';
    static readonly ERROR_MESSAGE_VALUE_IS_EMPTY = 'Id cannot be empty'
    static readonly ERROR_MESSAGE_VALUE_IS_TOO_SHORT = 'Id must be at least 8 characters long';

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(OrderId.ERROR_MESSAGE_VALUE_IS_EMPTY);
        }

        if (value.length < 8) {
            throw new Error(OrderId.ERROR_MESSAGE_VALUE_IS_TOO_SHORT);
        }
    }

    static create(value: string): OrderId {
        return new OrderId(value);
    }

    static generate(): OrderId {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        const orderId = `${OrderId.ORDER_ID_PREFIX}-${timestamp}-${random}`;
        return new OrderId(orderId);
    }

    static fromString(value: string): OrderId {
        return new OrderId(value);
    }

    toString(): string {
        return this.getValue();
    }
}