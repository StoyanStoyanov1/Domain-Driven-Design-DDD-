import {OrderId, OrderItemId, ProductName, ProductPrice} from "../value-object";

export class OrderItem {
    private readonly orderItemId: OrderItemId;
    private readonly orderId: OrderId;
    private readonly productName: ProductName;
    private readonly sku: string;
    private productPrice: ProductPrice;
    private quantity: number;
    private totalPrice: ProductPrice

    constructor(
        orderItemId: OrderItemId,
        orderId: OrderId,
        productName: ProductName,
        sku: string,
        productPrice: ProductPrice,
        quantity: number
    ) {
        this.validate(quantity);
        this.orderItemId = orderItemId;
        this.orderId = orderId;
        this.productName = productName;
        this.sku = sku;
        this.productPrice = productPrice;
        this.quantity = quantity;
        this.totalPrice = this.calculateTotalPrice();
    }

    private calculateTotalPrice(): ProductPrice {
        const total = this.productPrice.getValue() * this.quantity;
        return new ProductPrice(total);
    }

    private validate (quantity: number): void {
        if (quantity < 0) {
            throw new Error('Quantity must be greater than or qqual to 0');
        }
    }
    updateQuantity(newQuantity: number): void {
        this.validate(newQuantity);
        this.quantity = newQuantity;
        this.totalPrice = this.calculateTotalPrice();
    }

    getTotalPrice(): ProductPrice {
        return this.totalPrice;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getOrderItemId(): OrderItemId {
        return this.orderItemId;
    }

    getOrderId(): OrderId {
        return this.orderId;
    }

    getProductName(): ProductName {
        return this.productName;
    }

    getSku(): string {
        return this.sku;
    }

    getProductPrice(): ProductPrice {
        return this.productPrice;
    }
}