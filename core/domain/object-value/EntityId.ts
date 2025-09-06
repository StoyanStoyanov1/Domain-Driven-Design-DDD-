import { EntityIdType } from '../types/index'

export class EntityId<T extends EntityIdType> {
    private readonly EntityId: T;

    constructor(EntityId: T) {
        this.validate(EntityId);
        this.EntityId = EntityId;
    }

    private validate(value) {
        if (value === undefined || value === null ) {
            throw new Error('Value is not defined');
        }

        if (typeof value === 'string' && value.trim() === '') {
            throw new Error('EntityId string value cannot be empty or whitespace');
        }
    }

    get value() {
        return this.EntityId;
    }
}