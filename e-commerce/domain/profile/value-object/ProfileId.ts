import { SimpleValueObject } from "../../shared/domain/SimpleValueObject";

export class ProfileId extends SimpleValueObject<string> {
    static readonly ERROR_MESSAGE_VALUE_IS_EMPTY = 'Id cannot be empty';

    constructor(id: string) {
        super(id);
    }

   protected validate(value: string): void {
        if (!value || value.trim() === '') {
            throw new Error(ProfileId.ERROR_MESSAGE_VALUE_IS_EMPTY);
        }
   }

    get id(): string {
        return this.getValue();
    }
}