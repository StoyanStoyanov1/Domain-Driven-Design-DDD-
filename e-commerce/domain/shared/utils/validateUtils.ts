const isOnlyLetters = (value: string) => /^[A-Za-z]+$/.test(value);
const isValidPhoneNumber = (value: string) => /^\+\d{1,3}\d{9,12}$/.test(value);
const isValidUsername = (value: string) => /^[a-z0-9._]+$/.test(value);

export const validateUtils = {
    isOnlyLetters,
    isValidPhoneNumber,
    isValidUsername,
};