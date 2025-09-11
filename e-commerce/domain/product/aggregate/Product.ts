import {Entity} from "../../shared/domain/Entity";
import {ProductId, Sku, ProductName, Description, Price, Status} from "../value-object";

export class Product extends Entity{
    private readonly productId: ProductId;
    private readonly sku: Sku;
    private readonly productName: ProductName;
    private readonly description: Description;
    private readonly price: Price;
    private readonly createdAt: Date;
    private readonly status: Status;

    constructor(
        productId: ProductId,
        sku: Sku,
        productName: ProductName,
        description: Description,
        price: Price,
        status: Status,
    ) {
        super(productId.getValue());
        this.sku = sku;
        this.productName = productName;
        this.description = description;
        this.createdAt = new Date();
        this.price = price;
        this.status = status;
    }

    // Getters
    get id(): string { return this.productId.getValue(); }
    get skuValue(): string { return this.sku.getValue(); }
    get name(): string { return this.productName.getValue(); }
    get shortDescription(): string {return this.description.toPrimitives().short;}
    get fullDescription(): string {return this.description.toPrimitives().full;}

    // VO
    getProductId(): ProductId { return this.productId; }
    getSku(): Sku { return this.sku; }
    getProductName(): ProductName { return this.productName; }
    getDescription(): Description { return this.description; }
}