import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { Name, ProfileId, Gender, Username, PhoneNumber
 } from "../value-objects";

export class Profile extends AggregateRoot {
    private readonly profileId: ProfileId;
    private readonly firstName: Name;
    private readonly lastName: Name;
    private readonly dateOfBirth: Date;

    private gender: Gender;
    private middleName?: Name;
    private username?: Username;
    private phoneNumber?: PhoneNumber;
    private avatar?: string;

    constructor(
        profileId: ProfileId,
        firstName: Name,
        lastName: Name,
        dateOfBirth: Date,
        gender: Gender,
        middleName?: Name,
        username?: Username,
        phoneNumber?: PhoneNumber,
        avatar?: string
    ) {
        super(profileId.getValue());
        this.profileId = profileId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;

        this.middleName = middleName;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.avatar = avatar;
    }

    protected validate(value: any): void {
        // Implement validation logic if needed
    }

}