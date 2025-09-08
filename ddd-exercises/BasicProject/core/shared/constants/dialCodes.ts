import { CountryIsoCode } from '../enums/index';

export const DialCodes: Record<CountryIsoCode, string> = {
    [CountryIsoCode.BG]: '+359',
    [CountryIsoCode.EN]: '+44',
    [CountryIsoCode.RU]: '+7',
    [CountryIsoCode.DE]: '+49',
    [CountryIsoCode.US]: '+1',
};

export const DialCodeToCountry: Record<string, CountryIsoCode> = {
    '+359': CountryIsoCode.BG,
    '+44': CountryIsoCode.EN,
    '+7': CountryIsoCode.RU,
    '+49': CountryIsoCode.DE,
    '+1': CountryIsoCode.US,
};
