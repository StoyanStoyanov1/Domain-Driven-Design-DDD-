import { Entity } from "../../shared/domain/Entity";
import { CartId, CustomerId, CartStatus } from "../value-object/";

export class Cart extends Entity {
    private items: [] = [];
    private readonly customerId: CustomerId;
    // SessionId
    private readonly createdAt: Date;;
    private updatedAt: Date;
    private status: CartStatus;
    //IP address
    //Browser details

    constructor(private cartId: CartId) {
        super(cartId.getValue());
        this.customerId = new CustomerId(cartId.getValue());
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