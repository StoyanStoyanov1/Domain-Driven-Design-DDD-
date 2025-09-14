import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { AddressId, AddressType, Country, City, PostCode, Street, BuildingNumber, Apartment } from "../value-objects/";
export class Address extends AggregateRoot {
    private readonly addressId: AddressId;
    private readonly type: AddressType;
    private readonly country: Country;
    private readonly city: City;
    private readonly postCode: PostCode;
    private readonly street: Street;
    private buildingNumber?: BuildingNumber;
    private apartment?: Apartment;
    private isDefault: boolean;

    constructor(
        addressId: AddressId,
        type: AddressType,
        country: Country,
        city: City,
        postCode: PostCode,
        street: Street,
        isDefault: boolean,
        buildingNumber?: BuildingNumber,
        apartment?: Apartment,
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