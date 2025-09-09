export abstract class DomainEvent {
    public readonly occurredOn: Date;
    public readonly eventId: string;

    constructor() {
        this.occurredOn = new Date();
        this.eventId = this.generateId();
    }

    private generateId(): string {
        return Math.random().toString(36).slice(2, 9);
    }

    abstract getEventName(): string;
}