import { Entity } from "../../shared/domain/Entity";
import { OrderId, OrderItemId, ProductName, Price, Quantity, PrecentageDiscount } from "../value-object";

export class OrderItem extends Entity {
    static readonly CANT_HAVE_NEGATIVE_QUANTITY = 'Order item cannot have negative quantity';
    static readonly CANT_HAVE_ZERO_QUANTITY = 'Order item must have quantity greater than zero';

    private readonly orderItemId: OrderItemId;
    private readonly orderId: OrderId;
    private readonly productName: ProductName;
    private readonly sku: string;
    private productPrice: Price;
    private quantity: Quantity;
    private totalPrice: Price;
    private precentageDiscount?: PrecentageDiscount;

    constructor(
        orderItemId: OrderItemId,
        orderId: OrderId,
        productName: ProductName,
        sku: string,
        productPrice: Price,
        quantity: Quantity,
        precentageDiscount?: PrecentageDiscount
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
        this.precentageDiscount = precentageDiscount;
    }

    private calculateTotalPrice(): Price {
        const total = this.productPrice.getValue() * this.quantity.getValue();
        return Price.create(total).getValue(); 
    }

    private validate(quantity: Quantity): void {
        if (quantity.getValue() < 0) {
            throw new Error(OrderItem.CANT_HAVE_NEGATIVE_QUANTITY); 
        }
    }

    updateQuantity(newQuantity: number): void {
        this.quantity = Quantity.create(newQuantity);
        this.totalPrice = this.calculateTotalPrice();
    }

    increaseQuantity(amount: number): void {
        if (amount <= 0) {
            throw new Error(OrderItem.CANT_HAVE_ZERO_QUANTITY);
        }
        this.updateQuantity(this.quantity.getValue() + amount);
    }

    setNewPrice(newPrice: Price): void {
        this.productPrice = newPrice;
        this.totalPrice = this.calculateTotalPrice();
    }

    setPrecentageDiscount(precentageDiscount: PrecentageDiscount): void {
        this.precentageDiscount = precentageDiscount;
        this.totalPrice = this.calculateTotalPrice();
    }

    // Getters
    getTotalPrice(): Price { return this.totalPrice; }
    getQuantity(): Quantity { return this.quantity; }
    getOrderItemId(): OrderItemId { return this.orderItemId; }
    getOrderId(): OrderId { return this.orderId; }
    getProductName(): ProductName { return this.productName; }
    getSku(): string { return this.sku; }
    getProductPrice(): Price { return this.productPrice; }
    getPrecentageDiscount(): PrecentageDiscount | undefined { return this.precentageDiscount; }

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