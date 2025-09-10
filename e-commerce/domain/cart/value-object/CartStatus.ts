import { ValueObject } from "../../shared/domain/ValueObject";
import { cartStatusChoices } from "../enums";

export class CartStatus extends ValueObject<string> {
    static readonly ERROR_MESSAGE_VALUE_IS_EMPTY = 'Cart status cannot be empty';
    static readonly ERROR_MESSAGE_INVALID_STATUS = 'Invalid cart status';

    private constructor(value: string) {
        const normalizedValue = value.trim();
        super(normalizedValue);
    }

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(CartStatus.ERROR_MESSAGE_VALUE_IS_EMPTY);
        }
        const validStatuses: string[] = Object.values(cartStatusChoices);
        if (!validStatuses.includes(value)) {
            throw new Error(CartStatus.ERROR_MESSAGE_INVALID_STATUS + `: ${value}`);
        }
    }

    create(value: string): CartStatus {
        return new CartStatus(value);
    }

    static active() { return new CartStatus(cartStatusChoices.ACTIVE); }
    static abandoned() { return new CartStatus(cartStatusChoices.ABANDONED); }
    static converted() { return new CartStatus(cartStatusChoices.Converted); }
}