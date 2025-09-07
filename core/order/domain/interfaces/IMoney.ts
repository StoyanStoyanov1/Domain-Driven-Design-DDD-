import {TypeCurrencies} from "../enums";

export interface IMoney {
    amount: number;
    currency: TypeCurrencies;
}