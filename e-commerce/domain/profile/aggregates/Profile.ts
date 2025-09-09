import { ProfileId, Name, Email, PhoneNumber, Username, Address } from "../value-object";
import { DomainEvent } from "../../shared/events/DomainEvent";
import { ProfileCreatedEvent, ProfileUpdatedEvent, ProfileEmailChangedEvent } from "../events/";

export class Profile {
    private readonly id: ProfileId;
    private name: Name;
    private email: Email;
    private phoneNumber: PhoneNumber;
    private readonly username: Username;
    private readonly dateOfBirth: Date;
    private address: Address;
    private readonly createdAt: Date;
    private updatedAt: Date;
    private domainEvents: DomainEvent[] = [];

    constructor(
        id: ProfileId,
        name: Name,
        email: Email,
        phoneNumber: PhoneNumber,
        username: Username,
        dateOfBirth: Date,
        address: Address,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static create(
        id: ProfileId,
        name: Name,
        email: Email,
        phoneNumber: PhoneNumber,
        username: Username,
        dateOfBirth: Date,
        address: Address
    ): Profile {
        const now = new Date();
        const profile = new Profile(
            id,
            name,
            email,
            phoneNumber,
            username,
            dateOfBirth,
            address,
            now,
            now
        );

        profile.addDomainEvent(new ProfileCreatedEvent(id, email, name));
        return profile;
    }

    updateProfile(name: Name, phoneNumber: PhoneNumber, address: Address): void {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.updatedAt = new Date();

        this.addDomainEvent(new ProfileUpdatedEvent(this.id));
    }

    changeEmail(newEmail: Email): void {
        if (this.email.equals(newEmail)) return;

        this.email = newEmail;
        this.updatedAt = new Date();
        this.addDomainEvent(new ProfileEmailChangedEvent(this.id, newEmail));
    }

    getId(): ProfileId {
        return this.id;
    }

    getName(): Name {
        return this.name;
    }

    getEmail(): Email {
        return this.email;
    }

    getPhoneNumber(): PhoneNumber {
        return this.phoneNumber;
    }

    getUsername(): Username {
        return this.username;
    }

    getDateOfBirth(): Date {
        return this.dateOfBirth;
    }

    getAddress(): Address {
        return this.address;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    private addDomainEvent(event: DomainEvent): void {
        this.domainEvents.push(event);
    }

    getDomainEvents(): DomainEvent[] {
        return [...this.domainEvents];
    }

    clearDomainEvents(): void {
        this.domainEvents = [];
    }
}