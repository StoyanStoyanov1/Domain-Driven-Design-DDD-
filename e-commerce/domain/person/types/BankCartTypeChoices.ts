export const BankCardTypeChoices = {
    VISA: "Visa",
    DEBIT: "Debit",
    CREDIT: "Credit",
};

export type BankCardTypeChoice = keyof typeof BankCardTypeChoices;