import { Entity } from "../../shared/domain/Entity";
import { OrderId, CustomerId, Currency, PaymentMethod, PaymentStatus, OrderStatus } from "../value-object/";

export class Order extends Entity { 
    private readonly orderId: OrderId; 
    private readonly orderNumber: string;
    private readonly createdAt: Date;
    private readonly customerId: CustomerId;

    private orderStatus: OrderStatus;
    private subtotal: number;
    private vatAmount: number;
    private totalAmount: number;
    private currency: Currency;
    private paymentMethod: PaymentMethod;
    private paymentStatus: PaymentStatus;
    private notes: string[] = [];

    constructor(
        orderId: OrderId, 
        orderNumber: string,
        customerId: CustomerId,
        currency: Currency,
        paymentMethod: PaymentMethod
    ) {
        super(orderId.getValue());
        
        this.orderId = orderId;
        this.orderNumber = orderNumber;
        this.customerId = customerId;
        this.createdAt = new Date();
        this.currency = currency;
        this.paymentMethod = paymentMethod;

        this.subtotal = 0;
        this.vatAmount = 0;
        this.totalAmount = 0;
        this.orderStatus = OrderStatus.open();
        this.paymentStatus = PaymentStatus.pending();
    }

    getOrderId(): OrderId {
        return this.orderId;
    }

    addSubtotal(amount: number, vatRate: number): void {
        if (amount <= 0) {
            throw new Error("Amount must be greater than zero");
        }
        this.subtotal += amount;
        this.vatAmount = this.subtotal * vatRate;
        this.totalAmount = this.subtotal + this.vatAmount;
    }

    confirmPayment(): void {
        if (this.paymentStatus !== PaymentStatus.pending()) {
            throw new Error("Payment already processed");
        }
        this.paymentStatus = PaymentStatus.paid();
        this.orderStatus = OrderStatus.confirmed();
    }

    cancel(): void {
        if (this.orderStatus === OrderStatus.confirmed()) {
            throw new Error("Cannot cancel a confirmed order");
        }
        this.orderStatus = OrderStatus.cancelled();
    }

    addNote(note: string): void {
        this.notes.push(note);
    }

    getTotal(): number {
        return this.totalAmount;
    }

    getStatus(): string {
        return `${this.orderStatus} / ${this.paymentStatus}`;
    }
}