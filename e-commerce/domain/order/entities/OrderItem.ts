import {OrderId, OrderItemId, ProductName} from "../value-object";

class OrderItem {
    private readonly orderItemId: OrderItemId;
    private readonly orderId: OrderId;
    private readonly productName: ProductName;
    private readonly sku: string;
    private readonly productPrice: number;
    private readonly quantity: number;
    private readonly totalPrice: number
}