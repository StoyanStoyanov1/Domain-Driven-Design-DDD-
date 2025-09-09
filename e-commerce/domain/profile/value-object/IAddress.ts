export enum AddressType {
    HOME = 'HOME',
    WORK = 'WORK',
    OTHER = 'OTHER'
}

export interface IAddress {
    type: AddressType;
    country: string;
    city: string;
    region: string;
    postCode: string;
    street: string;
    building?: string;
    apartment?: string;
    isDefault: boolean;
}