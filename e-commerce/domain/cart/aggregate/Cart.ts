import { Entity } from "../../shared/domain/Entity";
import { CartId, CustomerId } from "../value-object/";

export class Cart extends Entity {
    private items: [] = [];
    private readonly customerId: CustomerId;

    constructor(private cartId: CartId) {
        super(cartId.getValue());
        this.customerId = new CustomerId(cartId.getValue());
    }

    getCartId(): CartId {
        return this.cartId;
    }

    getCustomerId(): CustomerId {
        return this.customerId;
    }
}