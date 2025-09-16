import { Result } from "../../shared/core";
import { ValueObject } from "../../shared/domain/ValueObject";
import { orderStatusChoices } from "../enums";

export class OrderStatus extends ValueObject<string> {
    constructor(value: string) {
        super(value);
    }

    protected validate(value: string): void {

        if (!value) {
            throw new Error('Order status is required');
        }
        const orderStatusChoicesArray: string[] = Object.values(orderStatusChoices);
        if (!orderStatusChoicesArray.includes(value)) {
            throw new Error(`Invalid order status: ${value}`);
        }
    }

    static create(value: string): Result<OrderStatus> {
        try {
            const orderStatus = new OrderStatus(value);
            return Result.ok<OrderStatus>(orderStatus);
        } catch (error) {
            return Result.fail<OrderStatus>(error.message);
        }
    }

    static open() { return new OrderStatus(orderStatusChoices.OPEN); }
    static confirmed() { return new OrderStatus(orderStatusChoices.CONFIRMED); }
    static cancelled() { return new OrderStatus(orderStatusChoices.CANCELLED); }
    static shipped() { return new OrderStatus(orderStatusChoices.SHIPPED); }
    static delivered() { return new OrderStatus(orderStatusChoices.DELIVERED); }
    static returned() { return new OrderStatus(orderStatusChoices.RETURNED); }
}