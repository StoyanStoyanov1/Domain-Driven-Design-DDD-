import {fixNumberToTwo} from "../../../shared/utils" ;
import {TypeCurrencies} from "../enums"
import {isCurrency} from "../utils";
import {IMoney} from "../interfaces";
import { ValueObject} from "../../../shared/domain/valueObject";
import { moneyData } from "../types";


export class Money extends ValueObject<moneyData> implements IMoney {
    static readonly MESSAGE_BY_EMPTY_AMOUNT = "Amount cannot be empty"
    static readonly MESSAGE_BY_NEGATIVE_AMOUNT = "Amount cannot be negative"
    static readonly MESSAGE_BY_EMPTY_CURRENCY = "Currency cannot be empty"
    static readonly MESSAGE_BY_INVALID_CURRENCY = "Currency is not valid"

    constructor(data: moneyData) {
        super(data);
    }

    get amount(): number {
        return this.value._amount;
    }

    get currency(): TypeCurrencies {
        return this.value._currency;
    }

    static create(amount: number, currency: string): Money {
        Money.amountIsCorrect(amount);

        const normalizedCurrency = currency?.trim().toUpperCase();
        Money.getCurrency(normalizedCurrency);

        return new Money({
            _amount: fixNumberToTwo(amount),
            _currency: normalizedCurrency as TypeCurrencies
        });
    }

    static amountIsCorrect(amount): void{
        if (!amount && amount !== 0) {
            throw new Error(Money.MESSAGE_BY_EMPTY_AMOUNT);
        }

        if (amount < 0) {
            throw new Error(Money.MESSAGE_BY_NEGATIVE_AMOUNT);
        }

    }

    static getCurrency(currency: string): TypeCurrencies {
        const UpCaseCurrency = currency ? currency.trim().toUpperCase() : null;

        if (!UpCaseCurrency) {
            throw new Error(Money.MESSAGE_BY_EMPTY_CURRENCY);
        }

        if (!isCurrency(UpCaseCurrency)) {
            throw new Error(Money.MESSAGE_BY_INVALID_CURRENCY);
        }

        return UpCaseCurrency
    }


    protected validate(value: moneyData): void {
        Money.amountIsCorrect(value._amount);
        Money.getCurrency(value._currency);
    }


}