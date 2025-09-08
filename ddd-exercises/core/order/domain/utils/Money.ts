import {TypeCurrencies} from "../enums";

export function isCurrency(value: string): value is TypeCurrencies {
    return Object.values(TypeCurrencies).includes(value as TypeCurrencies);
}