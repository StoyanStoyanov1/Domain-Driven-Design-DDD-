import { ValueObject } from '../../../shared/domain/valueObject';

export class ProductItemId extends ValueObject<string> {
    private static readonly PRODUCT_ITEM_PREFIX = 'ITEM';
    static readonly ERROR_MESSAGE_VALUE_IS_EMPTY = 'ProductItemId cannot be empty';

    protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(ProductItemId.ERROR_MESSAGE_VALUE_IS_EMPTY);
        }
    }

    static create(value: string): ProductItemId {
        return new ProductItemId(value);
    }

    static generate(): ProductItemId {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        const itemId = `${ProductItemId.PRODUCT_ITEM_PREFIX}-${timestamp}-${random}`;
        return new ProductItemId(itemId);
    }

    toString(): string {
        return this.getValue();
    }
}