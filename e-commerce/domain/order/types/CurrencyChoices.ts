export const CurrencyChoices = {
    BGN: 'BGN',
    USD: 'USD',
    EUR: 'EUR',
    RUB: 'RUB',
    GBP: 'GBP',
    CHF: 'CHF',
    CAD: 'CAD',
} as const;

export type CurrencyChoices = typeof CurrencyChoices[keyof typeof CurrencyChoices];