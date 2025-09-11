import {Entity} from "../../shared/domain/Entity";
import {ProductId, Sku } from "../value-object";

export class Product extends Entity{
    private readonly productId: ProductId;
    private readonly sku: Sku;

    constructor(
        productId: ProductId,
        sku: Sku,
    ) {
        super(productId.getValue());
        this.sku = sku;
    }
}