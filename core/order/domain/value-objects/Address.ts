import {IAddress} from '../interfaces';
import { addressType } from "../types";
import { validator} from '../utils'

export class Address implements IAddress{
    private readonly _street: addressType.street;
    private readonly _city: addressType.city;
    private readonly _country: addressType.country;
    private readonly _postalCode: addressType.postalCode;

    constructor(street: addressType.street,
                city: addressType.city,
                country: addressType.country,
                postalCode: addressType.postalCode) {

        this.validateInput(street, city, country, postalCode);
        this._street = street;
        this._city = city;
        this._country = country;
        this._postalCode = postalCode;
    }

    private validateInput(street: addressType.street,
                     city: addressType.city,
                     country: addressType.country,
                     postalCode: addressType.postalCode,): void {

        validator.validateStreet(street)
        validator.validateCity(city)
        validator.validateCountry(country)
        validator.validatePostalCode(postalCode)
    }



    get street() { return this._street; }
    get city() { return this._city; }
    get country() { return this._country; }
    get postalCode() { return this._postalCode; }
    get toString() { return `${this._street}\n${this._city}, ${this._country}, ${this._postalCode}`; }

}