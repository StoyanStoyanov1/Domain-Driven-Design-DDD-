import { PhoneNumberType } from '../types'
import { CountryIsoCode } from '../../shared/enums'
import { DialCodes, DialCodeToCountry } from '../../shared/constants'

class PhoneNumber {
    private readonly _value: PhoneNumberType;
    private readonly _countryCode?: CountryIsoCode;

    constructor(value: PhoneNumberType, countryCode?: CountryIsoCode) {
        this.isDefined(value);
        this._value = value;
        this._countryCode = countryCode || this.getCountryCode(value);
    }

    get value(): PhoneNumberType {
        return this._value;
    }

    get countryCode(): CountryIsoCode | undefined {
        return this._countryCode;
    }

    private isDefined(value: PhoneNumberType): void {
        if (!value || value.trim() === '') {
            throw new Error('Phone number value is not defined');
        }
    }



    private getCountryCode(value: PhoneNumberType): CountryIsoCode | undefined {
        if (!value || !value.startsWith('+')) {
            throw new Error('Phone number value does not start with a dial code');
        }

        const extractedDialCode = this.extractDialCodeFromNumber(value);

        if (!extractedDialCode) {
            throw new Error('Phone number value does not start with a valid dial code');
        }

        return DialCodeToCountry[extractedDialCode];
    }

    private extractDialCodeFromNumber(value: string): string | null {
        const sortedDialCodes = Object.values(DialCodes)
            .sort((a, b) => b.length - a.length);

        for (const dialCode of sortedDialCodes) {
            if (value.startsWith(dialCode)) {
                return dialCode;
            }
        }

        return null;
    }
}

export { PhoneNumber };