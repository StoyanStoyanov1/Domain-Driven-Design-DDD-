
import { ValueObject } from "../../../shared/domain/valueObject";
import { ShippingType } from "../types";
import { IShipping } from "../interfaces";
import { Address } from "./Address";

export class Shipping extends ValueObject<ShippingType.data> implements IShipping {
    static readonly MESSAGES = {
        // Method
        EMPTY_METHOD: 'Shipping method cannot be empty',
        INVALID_METHOD: 'Shipping method is not valid',
        // Status errors
        EMPTY_STATUS: 'Shipping status cannot be empty',
        INVALID_STATUS: 'Shipping status is not valid',
        // Address errors
        REQUIRED_ADDRESS: 'Address is required for delivery methods',
        // Tracking errors
        INVALID_TRACKING: 'Tracking number is invalid'
    } as const;

    constructor(data: ShippingType.data) {
        super(data);
    }

    static create(
        method: ShippingType.method,
        status: ShippingType.status,
        address?: Address,
        trackingNumber?: ShippingType.trackingNumber,
        estimatedDelivery?: Date
    ): Shipping {
        return new Shipping({
            method,
            status,
            address,
            trackingNumber,
            estimatedDelivery
        });
    }

    static createPickup(status: ShippingType.status = 'pending'): Shipping {
        return Shipping.create('pickup', status);
    }

    static createDelivery(
        method: Exclude<ShippingType.method, 'pickup'>,
        address: Address,
        status: ShippingType.status = 'pending'
    ): Shipping {
        return Shipping.create(method, status, address);
    }

    protected validate(value: ShippingType.data): void {
        if (!value.method) {
            throw new Error(Shipping.MESSAGES.EMPTY_METHOD);
        }
        const validMethods: ShippingType.method[] = [
            'pickup', 'standard', 'express', 'overnight', 'same_day', 'courier'
        ];
        if (!validMethods.includes(value.method)) {
            throw new Error(Shipping.MESSAGES.INVALID_METHOD);
        }

        // Validate status
        if (!value.status) {
            throw new Error(Shipping.MESSAGES.EMPTY_STATUS);
        }
        const validStatuses: ShippingType.status[] = [
            'pending', 'processing', 'shipped', 'in_transit', 'delivered', 'failed', 'returned'
        ];
        if (!validStatuses.includes(value.status)) {
            throw new Error(Shipping.MESSAGES.INVALID_STATUS);
        }

        if (value.method !== 'pickup' && !value.address) {
            throw new Error(Shipping.MESSAGES.REQUIRED_ADDRESS);
        }

        if (value.trackingNumber && value.trackingNumber.trim() === '') {
            throw new Error(Shipping.MESSAGES.INVALID_TRACKING);
        }
    }

    get method(): ShippingType.method {
        return this.value.method;
    }

    get status(): ShippingType.status {
        return this.value.status;
    }

    get address(): Address | undefined {
        return this.value.address;
    }

    get trackingNumber(): ShippingType.trackingNumber | undefined {
        return this.value.trackingNumber;
    }

    get estimatedDelivery(): Date | undefined {
        return this.value.estimatedDelivery;
    }

    isPickup(): boolean {
        return this.value.method === 'pickup';
    }

    isDelivery(): boolean {
        return this.value.method !== 'pickup';
    }

    isDelivered(): boolean {
        return this.value.status === 'delivered';
    }

    isPending(): boolean {
        return this.value.status === 'pending';
    }

    hasTracking(): boolean {
        return !!this.value.trackingNumber;
    }

    updateStatus(newStatus: ShippingType.status): Shipping {
        return Shipping.create(
            this.value.method,
            newStatus,
            this.value.address,
            this.value.trackingNumber,
            this.value.estimatedDelivery
        );
    }

    addTracking(trackingNumber: string): Shipping {
        return Shipping.create(
            this.value.method,
            this.value.status,
            this.value.address,
            trackingNumber,
            this.value.estimatedDelivery
        );
    }

    equals(other: Shipping): boolean {
        return this.value.method === other.value.method &&
            this.value.status === other.value.status &&
            this.value.trackingNumber === other.value.trackingNumber &&
            (this.value.address?.equals(other.value.address) ?? true);
    }

    toString(): string {
        const parts = [`${this.value.method} (${this.value.status})`];

        if (this.value.address) {
            parts.push(`to ${this.value.address.getFullAddress()}`);
        }

        if (this.value.trackingNumber) {
            parts.push(`tracking: ${this.value.trackingNumber}`);
        }

        return parts.join(' - ');
    }

    getShippingDetails(): string {
        if (this.isPickup()) {
            return `Pickup - Status: ${this.value.status}`;
        }

        let details = `${this.value.method} delivery to:\n${this.value.address?.getFullAddress()}`;
        details += `\nStatus: ${this.value.status}`;

        if (this.value.trackingNumber) {
            details += `\nTracking: ${this.value.trackingNumber}`;
        }

        if (this.value.estimatedDelivery) {
            details += `\nEstimated delivery: ${this.value.estimatedDelivery.toLocaleDateString()}`;
        }

        return details;
    }
}