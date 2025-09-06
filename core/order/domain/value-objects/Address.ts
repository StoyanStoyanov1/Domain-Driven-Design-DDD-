import {IAddress} from '../interfaces';
import { addressType } from "../types";
import { validator} from '../utils';
import { ValueObject} from "../../../shared/domain/valueObject";

export type AddressData = {
    readonly street: addressType.street;
    readonly city: addressType.city;
    readonly country: addressType.country;
    readonly postalCode: addressType.postalCode;
};

export class Address extends ValueObject<AddressData> implements IAddress {

    constructor(data: AddressData) {
        super(data);
    }

    static create(
        street: addressType.street,
        city: addressType.city,
        country: addressType.country,
        postalCode: addressType.postalCode
    ): Address {
        return new Address({
            street,
            city,
            country,
            postalCode
        });
    }

    protected validate(value: AddressData): void {
        validator.validateStreet(value.street);
        validator.validateCity(value.city);
        validator.validateCountry(value.country);
        validator.validatePostalCode(value.postalCode);
    }

    get street(): addressType.street {
        return this.value.street;
    }

    get city(): addressType.city {
        return this.value.city;
    }

    get country(): addressType.country {
        return this.value.country;
    }

    get postalCode(): addressType.postalCode {
        return this.value.postalCode;
    }

    getFullAddress(): string {
        return `${this.value.street}, ${this.value.city}, ${this.value.country}, ${this.value.postalCode}`;
    }

    toString(): string {
        return this.getFullAddress();
    }
}