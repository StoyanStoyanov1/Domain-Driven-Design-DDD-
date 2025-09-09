import {OrderId, OrderItemId} from "../value-object";

class OrderItem {
    private readonly orderItemId: OrderItemId;
    private readonly orderId: OrderId;
    private readonly productName: string;
    private readonly sku: string;
    private readonly productPrice: number;
    private readonly quantity: number;
    private readonly totalPrice: number
}