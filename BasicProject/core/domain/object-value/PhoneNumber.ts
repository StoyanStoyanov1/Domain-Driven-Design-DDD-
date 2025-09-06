import { PhoneNumberType } from '../types'

class PhoneNumber {
    private readonly _value: PhoneNumberType;

    constructor(value: PhoneNumberType) {
        this._value = value;
    }
}