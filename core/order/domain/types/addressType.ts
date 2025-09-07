type streetType = string;
type cityType = string;
type postalCodeType = string | number;
type countryType = string;


export namespace addressType {
    export type street = streetType;
    export type city = cityType;
    export type postalCode = postalCodeType
    export type country = countryType;
}

export type addressData = {
    readonly street: addressType.street;
    readonly city: addressType.city;
    readonly country: addressType.country;
    readonly postalCode: addressType.postalCode;
};

