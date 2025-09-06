import {hashCode} from "../utils";

abstract class Entity<id>{
    protected readonly id: id;

    constructor(id: id) {
        this.id = id;
    }

    hashCode(): number {
        return hashCode(this.id);
    }

    equals(other: Entity<id>): boolean {
        return this.hashCode() === other.hashCode();
    }

}
