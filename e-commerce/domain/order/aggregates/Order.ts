import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { OrderId, CustomerId, Currency, PaymentMethod, PaymentStatus, OrderStatus, Price, Note } from "../value-object";
import { OrderItem } from '../entities/OrderItem'

export class Order extends AggregateRoot { 
    private readonly orderItems: OrderItem[] = [];

    private readonly orderId: OrderId; 
    private readonly orderNumber: string;
    private readonly createdAt: Date;
    private readonly customerId: CustomerId;

    private updatedAt: Date;
    private note: Note;

    private orderStatus: OrderStatus;
    private totalAmount: Price;
    private subtotal: Price;
    private vatAmount: Price;
    private currency: Currency;
    private paymentMethod: PaymentMethod;
    private paymentStatus: PaymentStatus;

    constructor(
        orderId: OrderId, 
        orderNumber: string,
        customerId: CustomerId,
        currency: Currency,
        paymentMethod: PaymentMethod,
        note: Note,
        
    ) {
        super(orderId.getValue());
        
        this.orderId = orderId;
        this.orderNumber = orderNumber;
        this.customerId = customerId;
        this.createdAt = new Date();
        this.currency = currency;
        this.paymentMethod = paymentMethod;
        this.note = note;
    }

  
}