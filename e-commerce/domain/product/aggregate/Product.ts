import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import {ProductId, Sku, ProductName, Description, Price, Status} from "../value-object";
import {ProductCreateEvent} from "../events/";
import {StatusChoices} from "../types";

export class Product extends AggregateRoot{
    private readonly productId: ProductId;
    private readonly sku: Sku;
    private readonly createdAt: Date;
    
    private productName: ProductName;
    private description: Description;
    private price: Price;
    private status: Status;

    constructor(
        productId: ProductId,
        sku: Sku,
        productName: ProductName,
        description: Description,
        price: Price,
        status: Status,
    ) {
        super(productId.getValue());
        this.productId = productId;
        this.sku = sku;
        this.productName = productName;
        this.description = description;
        this.createdAt = new Date();
        this.price = price;
        this.status = status;
    }

    // Getters
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

     public static create(
        sku: string,
        name: string,
        shortDescription: string,
        fullDescription: string,
        price: number,
        status: string
    ): Product {
        const product = new Product(
            ProductId.create().getValue(),
            Sku.create(sku).getValue(),
            ProductName.create(name).getValue(),
            Description.create(shortDescription, fullDescription).getValue(),
            Price.create(price).getValue(),
            Status.create(StatusChoices.ACTIVE).getValue()
        );
        product.addDomainEvent(product.createEvent());
        return product;
        
    }

    public createEvent(): ProductCreateEvent {
        return new ProductCreateEvent(
            this.productId.getValue(),
            this.sku.getValue(),
            this.productName.getValue(),
            this.description.toPrimitives().short,
            this.description.toPrimitives().full,
            this.price.getValue(),
            this.status.getValue(),
            this.createdAt
        );
    }

}