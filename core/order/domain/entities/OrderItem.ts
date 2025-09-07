import { Entity } from '../../../shared/domain/Entity';
import { ProductItemId } from '../value-objects/ProductItemId';
import { OrderId } from '../value-objects/OrderId';
import { Money } from '../value-objects';

export class OrderItem extends Entity {

    //Fields
    private readonly _itemId: ProductItemId;
    private readonly _orderId: OrderId;
    private readonly _productName: string;
    private readonly _productSku: string;
    private readonly _unitPrice: Money;
    private readonly _discountPercentage: number;
    private readonly _createdAt: Date;

    private _quantity: number;
    private _subtotal: Money;
    private _discountedTotal: Money;
    private _updatedAt: Date;

    //Constructor
    constructor(
        itemId: ProductItemId,
        orderId: OrderId,
        productName: string,
        productSku: string,
        quantity: number,
        unitPrice: Money,
        discountPercentage: number = 0,
        createdAt?: Date
    ) {
        super(itemId.getValue());

        this.validate();
        this.calculateTotals();
        this._itemId = itemId;
        this._orderId = orderId;
        this._productName = productName;
        this._productSku = productSku;
        this._unitPrice = unitPrice;
        this._discountPercentage = discountPercentage;
        this._createdAt = createdAt || new Date();

        this._quantity = quantity;
        this._updatedAt = new Date();

        this._subtotal = unitPrice;
        this._discountedTotal = unitPrice;


    }

    //Getters
    get itemId(): ProductItemId {
        return this._itemId;
    }

    get orderId(): OrderId {
        return this._orderId;
    }

    get productName(): string {
        return this._productName;
    }

    get productSku(): string {
        return this._productSku;
    }

    get unitPrice(): Money {
        return this._unitPrice;
    }

    get discountPercentage(): number {
        return this._discountPercentage;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get quantity(): number {
        return this._quantity;
    }

    get subtotal(): Money {
        return this._subtotal;
    }

    get discountedTotal(): Money {
        return this._discountedTotal;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    //Validation
    private validate(): void {
        // Validate product name
        if (!this._productName || this._productName.trim() === '') {
            throw new Error('Product name cannot be empty');
        }

        // Validate product SKU
        if (!this._productSku || this._productSku.trim() === '') {
            throw new Error('Product SKU cannot be empty');
        }

        // Validate quantity
        if (!this._quantity || this._quantity <= 0) {
            throw new Error('Quantity must be positive number');
        }

        if (!Number.isInteger(this._quantity)) {
            throw new Error('Quantity must be whole number');
        }

        // Validate unit price
        if (this._unitPrice.amount <= 0) {
            throw new Error('Unit price must be positive number');
        }

        // Validate discount percentage
        if (this._discountPercentage < 0 || this._discountPercentage > 100) {
            throw new Error('Discount percentage must be between 0 and 100');
        }

        if (!Number.isFinite(this._discountPercentage)) {
            throw new Error('Discount percentage must be valid number');
        }
    }

    //Calculations
    private calculateTotals(): void {
        // Calculate subtotal (quantity × unit price)
        const subtotalAmount = this._unitPrice.amount * this._quantity;
        this._subtotal = Money.create(subtotalAmount, this._unitPrice.currency);

        // Calculate discount amount
        const discountAmount = subtotalAmount * (this._discountPercentage / 100);

        // Calculate final total after discount
        const finalAmount = subtotalAmount - discountAmount;
        this._discountedTotal = Money.create(finalAmount, this._unitPrice.currency);
    }

    //Methods
    updateQuantity(newQuantity: number): void {
        // Validate the new quantity
        if (!newQuantity || newQuantity <= 0) {
            throw new Error('Quantity must be positive number');
        }

        if (!Number.isInteger(newQuantity)) {
            throw new Error('Quantity must be whole number');
        }

        // Update quantity
        this._quantity = newQuantity;

        // Recalculate totals
        this.calculateTotals();

        // Update timestamp
        this._updatedAt = new Date();
    }

    getDiscountAmount(): Money {
        const discountAmount = this._subtotal.amount * (this._discountPercentage / 100);
        return Money.create(discountAmount, this._subtotal.currency);
    }

    getTotalSavings(): Money {
        return this.getDiscountAmount();
    }

    hasDiscount(): boolean {
        return this._discountPercentage > 0;
    }

    isExpensive(): boolean {
        return this._unitPrice.amount > 1000;
    }

    getFormattedSummary(): string {
        const savings = this.hasDiscount()
            ? ` (Spend: ${this.getTotalSavings().amount} ${this.getTotalSavings().currency})`
            : '';

        return `${this._productName} x ${this._quantity} = ${this._discountedTotal.amount} ${this._discountedTotal.currency}${savings}`;
    }

    /**
     * Creates a new OrderItem with generated ID
     */
    static create(
        orderId: OrderId,
        productName: string,
        productSku: string,
        quantity: number,
        unitPrice: Money,
        discountPercentage: number = 0
    ): OrderItem {
        const itemId = ProductItemId.generate();
        return new OrderItem(
            itemId,
            orderId,
            productName,
            productSku,
            quantity,
            unitPrice,
            discountPercentage
        );
    }

    /**
     * Creates OrderItem from existing data (e.g., from database)
     */
    static fromExisting(
        itemId: ProductItemId,
        orderId: OrderId,
        productName: string,
        productSku: string,
        quantity: number,
        unitPrice: Money,
        discountPercentage: number,
        createdAt: Date
    ): OrderItem {
        return new OrderItem(
            itemId,
            orderId,
            productName,
            productSku,
            quantity,
            unitPrice,
            discountPercentage,
            createdAt
        );
    }

    /**
     * Creates OrderItem without discount
     */
    static createWithoutDiscount(
        orderId: OrderId,
        productName: string,
        productSku: string,
        quantity: number,
        unitPrice: Money
    ): OrderItem {
        return OrderItem.create(
            orderId,
            productName,
            productSku,
            quantity,
            unitPrice,
        );
    }

    /**
     * Creates OrderItem from a Product object (if you have one)
     */
    static createFromProduct(
        orderId: OrderId,
        product: { name: string; sku: string; price: Money },
        quantity: number,
        discountPercentage: number = 0
    ): OrderItem {
        return OrderItem.create(
            orderId,
            product.name,
            product.sku,
            quantity,
            product.price,
            discountPercentage
        );
    }

}