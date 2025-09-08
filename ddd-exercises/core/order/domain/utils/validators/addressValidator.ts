import { addressType } from "../types";

export function validateStreet( street: addressType.street )  {
    if ( typeof street !== 'string' ) {
        throw new Error('Street must be a string');
    }

    if ( street.trim() === '' ) {
        throw new Error('Street cannot be empty');
    }
}

export function validatePostalCode( postalCode: addressType.postalCode )  {
    if ( typeof postalCode !== 'string' && typeof postalCode !== 'number') {
        throw new Error('Postal code must be a string or number');
    }

    if ( typeof postalCode === 'number') {
        postalCode = postalCode.toString();
    }

    if ( postalCode.trim() === '' ) {
        throw new Error('Postal code cannot be empty');
    }

    if ( typeof postalCode === 'string' && !/^\d{5}$/.test(postalCode) ) {
        throw new Error('Invalid postal code format');
    }
}

export function validateCity( city: addressType.city )  {
    if ( typeof city !== 'string' ) {
        throw new Error('City must be a string');
    }

    if ( city.trim() === '' ) {
        throw new Error('City cannot be empty');
    }

    if ( city.length < 3 ) {
        throw new Error('City must be at least 3 characters long');
    }

    if ( city.length > 20 ) {
        throw new Error('City cannot be longer than 20 characters');
    }
}

export function validateCountry( country: addressType.country )  {
    if ( typeof country !== 'string' ) {
        throw new Error('Country must be a string');
    }

    if ( country.trim() === '' ) {
        throw new Error('Country cannot be empty');
    }

    if ( country.length < 3 ) {
        throw new Error('Country must be at least 3 characters long');
    }

    if ( country.length > 20 ) {
        throw new Error('Country cannot be longer than 20 characters');
    }
}