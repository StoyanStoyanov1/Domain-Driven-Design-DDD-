import {validateStreet, validatePostalCode, validateCountry, validateCity} from './validators/addressValidator'

export namespace validator {
    export const validateStreet = validateStreet;
    export const validatePostalCode = validatePostalCode;
    export const validateCity = validateCity;
    export const validateCountry = validateCountry;
}