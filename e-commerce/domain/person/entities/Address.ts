import { Result } from "../../shared/core";
import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { AddressId, AddressType, Country, City, PostCode, Street, BuildingNumber, Apartment } from "../value-objects/";
export class Address extends AggregateRoot {
    private readonly addressId: AddressId;
    private readonly addressType: AddressType;
    private readonly country: Country;
    private readonly city: City;
    private readonly postCode: PostCode;
    private readonly street: Street;
    private readonly createdAt: Date = new Date();

    private updatedAt: Date = new Date();
    private buildingNumber?: BuildingNumber;
    private apartment?: Apartment;
    private isDefault: boolean;

    constructor(
        addressId: AddressId,
        addressType: AddressType,
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
        this.addressType = addressType;
        this.country = country;
        this.city = city;
        this.postCode = postCode;
        this.street = street;
        this.buildingNumber = buildingNumber;
        this.apartment = apartment;
        this.isDefault = isDefault;
    }

    //Getters
    get addressIdValue(): AddressId {
        return this.addressId;
    }

    get addressTypeValue(): AddressType {
        return this.addressType;
    }

    get countryValue(): Country {
        return this.country;
    }

    get cityValue(): City {
        return this.city;
    }

    get postCodeValue(): PostCode {
        return this.postCode;
    }

    get streetValue(): Street {
        return this.street;
    }

    get buildingNumberValue(): BuildingNumber | undefined {
        return this.buildingNumber;
    }

    get apartmentValue(): Apartment | undefined {
        return this.apartment;
    }

    get isDefaultAddress(): boolean {
        return this.isDefault;
    }

    get createdAtValue(): Date {
        return this.createdAt;
    }

    get updatedAtValue(): Date {
        return this.updatedAt;
    }

    //Setters
    setBuildingNumber(buildingNumber: string): void {
        this.buildingNumber = BuildingNumber.create(buildingNumber).getValue();
    }

    setApartment(apartment: string): void {
        this.apartment = Apartment.create(apartment).getValue();
    }

    setIsDefault(isDefault: boolean): void {
        this.isDefault = isDefault;
    }

    //Factory method
    static create(
        addressType: string,
        country: string,
        city: string,
        postCode: string,
        street: string,
        isDefault: boolean,
        buildingNumber?: string,
        apartment?: string,
    ): Result<Address> {
        try {
            const address = new Address(
                AddressId.create().getValue(),
                AddressType.create(addressType).getValue(),
                Country.create(country).getValue(),
                City.create(city).getValue(),
                PostCode.create(postCode).getValue(),
                Street.create(street).getValue(),
                isDefault,
                buildingNumber ? BuildingNumber.create(buildingNumber).getValue() : undefined,
                apartment ? Apartment.create(apartment).getValue() : undefined,
            );
            return Result.ok<Address>(address);
        } catch (error) {
            return Result.fail<Address>(error.message);
        }

    }
}