import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/core";

export class OrderId extends ValueObject<string> {
    static readonly CANT_BE_EMPTY = 'OrderId cannot be empty';

    constructor(value: string) {
        super(value);
    }

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(OrderId.CANT_BE_EMPTY);
        }
    }

    get id(): string {
        return this.getValue();
    }

    public static create(id: string): Result<OrderId> {
        try {
            const orderId =  new OrderId(id);
            return Result.ok<OrderId>(orderId)
        } catch (error) {
            return Result.fail<OrderId>(error.message);
        }
    }
}