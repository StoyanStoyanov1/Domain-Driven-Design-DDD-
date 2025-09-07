import { Address } from "../value-objects/Address";

type method = 'pickup' | 'standard' | 'express' | 'overnight' | 'same_day' | 'courier';
type status = 'pending' | 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'failed' | 'returned';
type trackingNumber = string;

export namespace ShippingType {
    export type method = method;
    export type status = status;
    export type trackingNumber = trackingNumber;
    export type data = {
        readonly method: ShippingType.method;
        readonly status: ShippingType.status;
        readonly address?: Address;
        readonly trackingNumber?: ShippingType.trackingNumber;
        readonly estimatedDelivery?: Date;
    }
}