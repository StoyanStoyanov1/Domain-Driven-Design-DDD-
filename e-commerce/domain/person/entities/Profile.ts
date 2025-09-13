import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { Name } from "../value-objects";

export class Profile extends AggregateRoot {
    private readonly profileId: string;
    private readonly firstName: Name;
    private readonly lastName: Name;
    private readonly dateOfBirth: Date;
    private readonly gender: string;

    private middleName?: Name;
    private username?: string;
    private phoneNumber?: string;
    private avatar?: string;

    constructor(
        firstName: string,
        lastName: string,
        dateOfBirth: Date,
        gender: string,
        middleName?: string,
        username?: string,
        phoneNumber?: string,
        avatar?: string
    ) {
        super('profileId');
        this.firstName = Name.create(firstName);
        this.lastName = Name.create(lastName);
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        
        this.middleName =  middleName ?  Name.create(middleName) : undefined;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.avatar = avatar;
    }

    protected validate(value: any): void {
        // Implement validation logic if needed
    }

}