export const AddressTypeChoices = {
    HOME: "home",
    WORK: "work",
    OTHER: "other",
} as const;

export type AddressType = typeof AddressTypeChoices[keyof typeof AddressTypeChoices];