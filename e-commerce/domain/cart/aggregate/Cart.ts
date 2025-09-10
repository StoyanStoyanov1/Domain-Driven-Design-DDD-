import { Entity } from "../../shared/domain/Entity";
import { CartId } from "../value-object/";

export class Cart extends Entity {
    private items: [] = [];

    constructor(private cartId: CartId) {
        super(cartId.getValue());
    }

    getCartId(): CartId {
        return this.cartId;
    }
}