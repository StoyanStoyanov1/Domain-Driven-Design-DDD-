import { Entity } from '../../shared/domain/Entity';
import { CartItemId, Quantity } from '../value-object/';

export class CartItem extends Entity {
    private readonly cartItemId: CartItemId;
    private readonly productId: string; // ProductId value object later...
    private quantity: Quantity;


    constructor(
        cartItemId: CartItemId,
        productId: string,
        quantity: Quantity
    ) {
        super(cartItemId.getValue());
        this.cartItemId = cartItemId;
        this.productId = productId;
        this.quantity = quantity;
    }

    getCartItemId(): CartItemId {
        return this.cartItemId;
    }

    getProductId(): string {
        return this.productId;
    }

    getQuantity(): Quantity {
        return this.quantity;
    }
    increaseQuantity(amount: number): void {
        this.quantity = Quantity.increaseQuantity(this.quantity, amount);
    }

    decreaseQuantity(amount: number): void {
        this.quantity = Quantity.decreaseQuantity(this.quantity, amount);
    }
}