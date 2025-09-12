import { ProductCreateEvent } from "./ProductCreateEvent";
    
export class ProductCreateHandler {
    handle(event: ProductCreateEvent) {
        // Handle the product creation event
        console.log(`Product created: ${event.productId}: (SKU: ${event.sku}, Name: ${event.name})`);
    }
}