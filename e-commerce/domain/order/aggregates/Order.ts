import {OrderId, CustomerId, Currency} from "../value-object/";
import {PaymentStatus} from "../value-object/PaymentStatus";
import {PaymentMethod} from "../value-object/PaymentMethod";

export class Order {
    private readonly id: OrderId;
    private readonly orderNumber: string;
    private readonly createAt: Date;
    private readonly customerId: CustomerId;

    private  orderStatus: boolean;
    private  subtotal: number;
    private  vatAmount: number;
    private  totalAmount: number;
    private  currency: Currency;
    private  paymentMethod: PaymentMethod;
    private  paymentStatus: PaymentStatus;
    private  notes: string;
}