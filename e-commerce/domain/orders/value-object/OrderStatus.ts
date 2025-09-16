import { Result } from "../../shared/core";
import { ValueObject } from "../../shared/domain/ValueObject";
import { OrderStatusChoices, OrderStatusType } from "../types";

export class OrderStatus extends ValueObject<string> {
    static readonly IS_REQUIRED = 'Order status is required';
    static readonly INVALID_STATUS = 'Invalid order status';

    constructor(value: string) {
        const normalizedValue = value.trim().toUpperCase();
        super(normalizedValue);
    }

    protected validate(value: string): void {
        if (!value) {
            throw new Error(OrderStatus.IS_REQUIRED);
        }

        const statusIsValid: boolean = Object.values(OrderStatusChoices).includes(value as OrderStatusType);
        
        if (!statusIsValid) {
            throw new Error(`${OrderStatus.INVALID_STATUS}: ${value}`);
        }
    }

    static create(value: string): Result<OrderStatus> {
        try {
            const normalizedValue = value.trim().toUpperCase();
            const orderStatus = new OrderStatus(normalizedValue);
            return Result.ok<OrderStatus>(orderStatus);
        } catch (error) {
            return Result.fail<OrderStatus>(error.message);
        }
    }
}