import {Entity} from "../../shared/domain/Entity";
import {ProductId, Sku, ProductName, Description, Price, Status} from "../value-object";
import {Result} from "../../shared/core";
import {StatusChoices} from "../types";

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
    ) {
        super(productId.getValue());
        this.sku = sku;
        this.productName = productName;
        this.description = description;
        this.createdAt = new Date();
        this.price = price;
        this.status = StatusChoices.ACTIVE as Status;
    }

    // Getters
    get id(): string { return this.productId.getValue(); }
    get skuValue(): string { return this.sku.getValue(); }
    get name(): string { return this.productName.getValue(); }
    get shortDescription(): string {return this.description.toPrimitives().short;}
    get fullDescription(): string {return this.description.toPrimitives().full;}
    get priceValue(): number { return this.price.getValue(); }
    get createdAtValue(): Date { return this.createdAt; }
    get statusValue(): Status { return this.status; }

    // VO
    getProductId(): ProductId { return this.productId; }
    getSku(): Sku { return this.sku; }
    getProductName(): ProductName { return this.productName; }
    getDescription(): Description { return this.description; }
    getPrice(): Price { return this.price; }
    getCreatedAt(): Date { return this.createdAt; }
    getStatus(): Status { return this.status; }

    static create(
        productId: ProductId,
        sku: Sku,
        productName: ProductName,
        description: Description,
        price: Price,
    ): Result<Product> {
        try {
            const product = new Product(
                productId,
                sku,
                productName,
                description,
                price,
            );
            return Result.ok<Product>(product);
        } catch (error) {
            return Result.fail<Product>(error.message);
        }
    }

}