import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { ProductId, Sku, ProductName, Description, Price, Status } from "../value-object";
import { ProductCreateEvent, ProductUpdatedEvent } from "../events/";
import { StatusChoices, ProductUpdateProps } from "../types";

export class Product extends AggregateRoot {
    static readonly NAME_ERROR_MESSAGE = "The product name must be between 3 and 100 characters.";
    static readonly PRICE_ERROR_MESSAGE = "The product price must be a positive number.";
    static readonly STATUS_ERROR_MESSAGE = "The product status must be either 'active' or 'inactive'.";
    static readonly UPDATE_ERROR_MESSAGE = "At least one field must be provided for update.";

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
    get shortDescription(): string { return this.description.toPrimitives().short; }
    get fullDescription(): string { return this.description.toPrimitives().full; }
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

    //create
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


    // Update methods


    public update(props: ProductUpdateProps): void {
        const { name, shortDescription, fullDescription, price, status } = props;

        if (!name && !shortDescription && !fullDescription && !price && !status) {
            throw new Error(Product.UPDATE_ERROR_MESSAGE);
        }

        let changed = false;

        if (name && this.productName.getValue() !== name) {
            this.productName = ProductName.create(name).getValue();
            changed = true;
        }
        if (shortDescription || fullDescription) {
            const currentShort = this.description.toPrimitives().short;
            const currentFull = this.description.toPrimitives().full;
            const newShort = shortDescription ?? currentShort;
            const newFull = fullDescription ?? currentFull;
            if (currentShort !== newShort || currentFull !== newFull) {
                this.description = Description.create(newShort, newFull).getValue();
                changed = true;
            }
        }
        if (price && this.price.getValue() !== price) {
            this.price = Price.create(price).getValue();
            changed = true;
        }
        if (status && this.status.getValue() !== status) {
            this.status = Status.create(status).getValue();
            changed = true;
        }

        if (changed) {
            this.addDomainEvent(this.createUpdatedEvent());
        }
    }

    public updateName(name: string): void {
        this.update({ name });
    }

    public updateDescription(shortDescription?: string, fullDescription?: string): void {
        this.update({ shortDescription, fullDescription });
    }

    public updatePrice(price: number): void {
        this.update({ price });
    }
    
    public updateStatus(status: StatusChoices): void {
        this.update({ status });
    }

    //Events
    private createUpdatedEvent(): ProductUpdatedEvent {
        return new ProductUpdatedEvent(
            this.productId.getValue(),
            this.sku.getValue(),
            this.productName.getValue(),
            this.description.toPrimitives().short,
            this.description.toPrimitives().full,
            this.price.getValue(),
            this.status.getValue(),
            new Date()
        );

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