import { Entity } from "../../shared/domain/Entity";
import { CartId, CustomerId, CartStatus } from "../value-object/";
import { CartItem } from "../entities/CartItem";

export class Cart extends Entity {
    private readonly cartId: CartId;
    private items: CartItem[] = [];
    private readonly customerId: CustomerId;
    // SessionId
    private readonly createdAt: Date;
    private updatedAt: Date;
    private status: CartStatus;
    //IP address
    //Browser details

    constructor(
        cartId: CartId,
        customerId: CustomerId,
    ) {
        super(cartId.getValue());
        this.customerId = customerId;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.status = CartStatus.active();
    }

    getCartId(): CartId {
        return this.cartId;
    }

    getCustomerId(): CustomerId {
        return this.customerId;
    }

    private touch(): void{
        this.updatedAt = new Date();
    }

}