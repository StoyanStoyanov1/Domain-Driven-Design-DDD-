import { OrderId, CustomerId, Currency } from "../value-object/";
import { PaymentStatus } from "../value-object/PaymentStatus";
import { PaymentMethod } from "../value-object/PaymentMethod";

export class Order {
    private readonly id: OrderId;
    private readonly orderNumber: string;
    private readonly createdAt: Date;
    private readonly customerId: CustomerId;

    private orderStatus: "OPEN" | "CONFIRMED" | "CANCELLED";
    private subtotal: number;
    private vatAmount: number;
    private totalAmount: number;
    private currency: Currency;
    private paymentMethod: PaymentMethod;
    private paymentStatus: PaymentStatus;
    private notes: string[] = [];

    constructor(
        id: OrderId,
        orderNumber: string,
        customerId: CustomerId,
        currency: Currency,
        paymentMethod: PaymentMethod
    ) {
        this.id = id;
        this.orderNumber = orderNumber;
        this.customerId = customerId;
        this.createdAt = new Date();
        this.currency = currency;
        this.paymentMethod = paymentMethod;

        this.subtotal = 0;
        this.vatAmount = 0;
        this.totalAmount = 0;
        this.orderStatus = "OPEN";
        this.paymentStatus = PaymentStatus.pending();
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
        this.orderStatus = "CONFIRMED";
    }

    cancel(): void {
        if (this.orderStatus === "CONFIRMED") {
            throw new Error("Cannot cancel a confirmed order");
        }
        this.orderStatus = "CANCELLED";
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
