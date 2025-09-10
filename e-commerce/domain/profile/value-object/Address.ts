import { Result } from "../../shared/core";
import {ValueObject} from "../../shared/domain/ValueObject";
import {IAddress} from "./IAddress";

export class Address extends ValueObject<IAddress> {
    constructor(value: IAddress) {
        super(value);
    }

    protected validate(obj: IAddress): void {
        if (!obj.country?.trim()) {
            throw new Error('Country is required and cannot be empty');
        }
        if (!obj.city?.trim()) {
            throw new Error('City is required and cannot be empty');
        }
        if (!obj.region?.trim()) {
            throw new Error('Region is required and cannot be empty');
        }
        if (!obj.postCode?.trim()) {
            throw new Error('Post code is required and cannot be empty');
        }
        if (!obj.street?.trim()) {
            throw new Error('Street is required and cannot be empty');
        }

        if (!obj.type?.trim()) {
            throw new Error('Address type is required');
        }

        if (typeof obj.isDefault !== 'boolean') {
            throw new Error('isDefault must be a boolean value');
        }
    }

    public toObject(): IAddress {
        return { ...this.value };
    }

    public isDefault(): boolean {
        return this.value.isDefault;
    }

    public getFullAddress(): string {
        const parts = [this.value.street];
        if (this.value.building) parts.push(`Building ${this.value.building}`);
        if (this.value.apartment) parts.push(`Apt ${this.value.apartment}`);
        parts.push(this.value.city, this.value.region, this.value.postCode, this.value.country);
        return parts.join(', ');
    }

    static create(address: IAddress): Result<Address> {
        try {
            return Result.ok(new Address(address));
        } catch (error) {
            return Result.fail<Address>(error.message);
        }
    }
}