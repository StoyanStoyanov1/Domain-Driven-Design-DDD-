import { DomainEvent } from "../events/DomainEvent";
import { Entity } from "./Entity";

export abstract class AggregateRoot extends Entity {
    private _domainEvents: DomainEvent[] = [];
    
    get domainEvents(): DomainEvent[] {
        return [...this._domainEvents];
    }

    protected addDomainEvent(event: DomainEvent): void {
        this._domainEvents.push(event);
    }

    public clearDomainEvents(): void {
        this._domainEvents = [];
    }

    public hasEvents(): boolean {
        return this._domainEvents.length > 0;
    }


}