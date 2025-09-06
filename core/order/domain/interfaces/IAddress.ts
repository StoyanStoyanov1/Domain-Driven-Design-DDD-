import {addressType} from "../types";

export interface IAddress {
    street: addressType.street;
    city: addressType.city;
    country: addressType.country;
    postalCode: addressType.postalCode;
    toString(): string;
}