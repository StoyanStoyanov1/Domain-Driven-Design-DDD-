import { Entity } from "../../shared/domain/Entity"; // ⬅️ ДОБАВЯМЕ Entity import
import { ProfileId, Name, Email, PhoneNumber, Username, Address } from "../value-object";
import { DomainEvent } from "../../shared/events/DomainEvent";
import { ProfileCreatedEvent, ProfileUpdatedEvent, ProfileEmailChangedEvent } from "../events/";

export class Profile extends Entity { 
    private readonly profileId: ProfileId; 
    private readonly username: Username;
    private readonly dateOfBirth: Date;
    private readonly createdAt: Date;

    private name: Name;
    private email: Email;
    private phoneNumber: PhoneNumber;
    private address: Address;
    private updatedAt: Date;
    private domainEvents: DomainEvent[] = [];

    constructor(
        profileId: ProfileId, // 
        name: Name,
        email: Email,
        phoneNumber: PhoneNumber,
        username: Username,
        dateOfBirth: Date,
        address: Address,
        createdAt: Date,
        updatedAt: Date
    ) {
        super(profileId.getValue()); 
        this.profileId = profileId; 
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
        profileId: ProfileId, // ⬅️ ProfileId за Profile entity
        name: Name,
        email: Email,
        phoneNumber: PhoneNumber,
        username: Username,
        dateOfBirth: Date,
        address: Address
    ): Profile {
        const now = new Date();
        const profile = new Profile(
            profileId, // ⬅️ Profile ID
            name,
            email,
            phoneNumber,
            username,
            dateOfBirth,
            address,
            now,
            now
        );

        profile.addDomainEvent(new ProfileCreatedEvent(profileId, email, name));
        return profile;
    }

    updateProfile(name: Name, phoneNumber: PhoneNumber, address: Address): void {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.updatedAt = new Date();

        this.addDomainEvent(new ProfileUpdatedEvent(this.profileId)); // ⬅️ Profile ID
    }

    changeEmail(newEmail: Email): void {
        if (this.email.equals(newEmail)) return;

        this.email = newEmail;
        this.updatedAt = new Date();
        this.addDomainEvent(new ProfileEmailChangedEvent(this.profileId, newEmail)); // ⬅️ Profile ID
    }

    // ⬅️ Getter връща Profile ID
    getProfileId(): ProfileId {
        return this.profileId;
    }

    // Останалите getters...
    getName(): Name { return this.name; }
    getEmail(): Email { return this.email; }
    getPhoneNumber(): PhoneNumber { return this.phoneNumber; }
    getUsername(): Username { return this.username; }
    getDateOfBirth(): Date { return this.dateOfBirth; }
    getAddress(): Address { return this.address; }
    getCreatedAt(): Date { return this.createdAt; }
    getUpdatedAt(): Date { return this.updatedAt; }

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