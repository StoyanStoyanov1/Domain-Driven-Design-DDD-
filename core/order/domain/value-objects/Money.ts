import {fixNumberToTwo} from "../../shared/utils";
import {TypeCurrencies} from "../enums"
import {isCurrency} from "../utils";
import {IMoney} from "../interfaces";

export class Money implements IMoney {
    private readonly _amount: number;
    private readonly _currency: TypeCurrencies;

    constructor(amount: number, currency: string) {
        this.amountIsCorrect(amount);
        this._amount = fixNumberToTwo(amount);
        this._currency = this.getCurrency(currency);
    }

    get amount(): number {
        return this._amount;
    }

    get currency(): TypeCurrencies {
        return this._currency;
    }

    private amountIsCorrect(amount): void{
        if (!amount && amount !== 0) {
            throw new Error("Amount cannot be empty");
        }

        if (amount < 0) {
            throw new Error("Amount cannot be negative");
        }

    }

    private getCurrency(currency: string): TypeCurrencies {
        const UpCaseCurrency = currency ? currency.trim().toUpperCase() : null;

        if (!UpCaseCurrency) {
            throw new Error("Currency cannot be empty");
        }

        if (!isCurrency(UpCaseCurrency)) {
            throw new Error("Currency is not valid");
        }

        return UpCaseCurrency
    }

    get toString(): string {
        return `${this._amount} ${this._currency}`;
    }
}