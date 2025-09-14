import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { AddressId, AddressType, Country, City} from "../value-objects/";
export class Address extends AggregateRoot {
    private readonly addressId: AddressId;
    private readonly type: AddressType;
    private readonly country: Country;
    private readonly city: City;
    private readonly postCode: string;
    private readonly street: string;
    private buildingNumber?: string;
    private apartment?: string;
    private isDefault: boolean;

    constructor(
        addressId: AddressId,
        type: AddressType,
        country: Country,
        city: City,
        postCode: string,
        street: string,
        isDefault: boolean,
        buildingNumber?: string,
        apartment?: string,
    ) {
        super(addressId.getValue());
        this.addressId = addressId;
        this.type = type;
        this.country = country;
        this.city = city;
        this.postCode = postCode;
        this.street = street;
        this.buildingNumber = buildingNumber;
        this.apartment = apartment;
        this.isDefault = isDefault;
    }

}