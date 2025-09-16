import { Entity } from "../../shared/domain/Entity";
import { OrderId, OrderItemId, ProductName, Price, Quantity } from "../value-object";

export class OrderItem extends Entity {
    private readonly orderItemId: OrderItemId;
    private readonly orderId: OrderId;
    private readonly productName: ProductName;
    private readonly sku: string;
    private productPrice: Price;
    private quantity: Quantity;
    private totalPrice: Price;

    constructor(
        orderItemId: OrderItemId,
        orderId: OrderId,
        productName: ProductName,
        sku: string,
        productPrice: Price,
        quantity: Quantity
    ) {
        super(orderItemId.getValue());
        this.validate(quantity);
        
        this.orderItemId = orderItemId;
        this.orderId = orderId;
        this.productName = productName;
        this.sku = sku;
        this.productPrice = productPrice;
        this.quantity = quantity;
        this.totalPrice = this.calculateTotalPrice();
    }

    private calculateTotalPrice(): Price {
        const total = this.productPrice.getValue() * this.quantity.getValue();
        return Price.create(total).getValue(); 
    }

    private validate(quantity: Quantity): void {
        if (quantity.getValue() < 0) {
            throw new Error('Quantity must be greater than or equal to 0'); 
        }
    }

    updateQuantity(newQuantity: number): void {
        this.quantity = Quantity.create(newQuantity);
        this.totalPrice = this.calculateTotalPrice();
    }

    isSameProduct(sku: string): boolean {
        return this.sku === sku;
    }

    increaseQuantity(amount: number): void {
        if (amount <= 0) {
            throw new Error('Amount must be positive');
        }
        this.updateQuantity(this.quantity.getValue() + amount);
    }

    getTotalPrice(): Price { return this.totalPrice; }
    getQuantity(): Quantity { return this.quantity; }
    getOrderItemId(): OrderItemId { return this.orderItemId; }
    getOrderId(): OrderId { return this.orderId; }
    getProductName(): ProductName { return this.productName; }
    getSku(): string { return this.sku; }
    getProductPrice(): Price { return this.productPrice; }

    static create(
        orderItemId: OrderItemId,
        orderId: OrderId,
        productName: ProductName,
        sku: string,
        productPrice: Price,
        quantity: Quantity,
    ): OrderItem {
        return new OrderItem(
            orderItemId,
            orderId,
            productName,
            sku,
            productPrice,
            quantity
        );
    }
}