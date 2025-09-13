export const GenderChoices = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other"
} as const;

export type GenderChoices = (typeof GenderChoices)[keyof typeof GenderChoices];