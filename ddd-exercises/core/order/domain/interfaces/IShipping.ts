import { ShippingType } from "../types";
import { Address } from "../value-objects/Address";

export interface IShipping {
    method: ShippingType.method;
    status: ShippingType.status;
    address?: Address;
    trackingNumber?: ShippingType.trackingNumber;
    estimatedDelivery?: Date;
    toString(): string;
}