import {ValueObject} from "../../shared/domain/ValueObject";
import {Result} from "../../shared/core";

export class OrderItemId extends ValueObject<string>{
    static readonly CANT_BE_EMPTY = 'OrderItemId cannot be empty';

    constructor(value: string) {
        super(value);
    }

    protected validate(value: string) {
        if (!value || value.trim() === '') {
            throw new Error(OrderItemId.CANT_BE_EMPTY);
        }
    }

    get id(): string {
        return this.getValue();
    }

    public static create(id: string): Result<OrderItemId> {
        try {
        const orderItemId = new OrderItemId(id);
            return Result.ok<OrderItemId>(orderItemId);
        } catch (error) {
            return Result.fail<OrderItemId>(error.message);
        }
    }
}