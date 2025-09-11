import {Entity} from "../../shared/domain/Entity";
import {ProductId, Sku, ProductName } from "../value-object";

export class Product extends Entity{
    private readonly productId: ProductId;
    private readonly sku: Sku;
    private readonly productName: ProductName;

    constructor(
        productId: ProductId,
        sku: Sku,
        productName: ProductName
    ) {
        super(productId.getValue());
        this.sku = sku;
        this.productName = productName;
    }

    // Getters
    get id(): string { return this.productId.getValue(); }
    get skuValue(): string { return this.sku.getValue(); }
    get name(): string { return this.productName.getValue(); }

    // VO
    getProductId(): ProductId { return this.productId; }
    getSku(): Sku { return this.sku; }
    getProductName(): ProductName { return this.productName; }
}