import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/core";

export class OrdersId extends ValueObject<string> {
    static readonly CANT_BE_EMPTY = 'OrdersId cannot be empty';

    constructor(value: string) {
        super(value);
    }

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(OrdersId.CANT_BE_EMPTY);
        }
    }

    get id(): string {
        return this.getValue();
    }

    public static create(id: string): Result<OrdersId> {
        try {
            const ordersId =  new OrdersId(id);
            return Result.ok<OrdersId>(ordersId)
        } catch (error) {
            return Result.fail<OrdersId>(error.message);
        }
    }
}