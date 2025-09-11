import {Entity} from "../../shared/domain/Entity";
import {ProductId, Sku, ProductName, Description } from "../value-object";

export class Product extends Entity{
    private readonly productId: ProductId;
    private readonly sku: Sku;
    private readonly productName: ProductName;
    private readonly description: Description;

    constructor(
        productId: ProductId,
        sku: Sku,
        productName: ProductName,
        description: Description
    ) {
        super(productId.getValue());
        this.sku = sku;
        this.productName = productName;
        this.description = description;
    }

    // Getters
    get id(): string { return this.productId.getValue(); }
    get skuValue(): string { return this.sku.getValue(); }
    get name(): string { return this.productName.getValue(); }
    get shortDescription(): string {return this.description.short;}

    // VO
    getProductId(): ProductId { return this.productId; }
    getSku(): Sku { return this.sku; }
    getProductName(): ProductName { return this.productName; }
}