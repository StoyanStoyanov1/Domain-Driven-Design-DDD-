
import { Entity } from '../../../shared/domain/Entity';
import { ProductItemId } from '../value-objects/ProductItemId';
import { OrderId } from '../value-objects/OrderId';
import { Money } from '../value-objects';

export class OrderItem extends Entity {
    // Readonly fields (cannot change after creation)
    private readonly _itemId: ProductItemId;
    private readonly _orderId: OrderId;
    private readonly _productName: string;
    private readonly _productSku: string;
    private readonly _unitPrice: Money;
    private readonly _discountPercentage: number;
    private readonly _createdAt: Date;

    private _quantity: number;
    private _subtotal: Money;
    private _discountedTotal: Money;
    private _updatedAt: Date;

}