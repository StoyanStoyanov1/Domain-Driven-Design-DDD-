import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { Name, ProfileId} from "../value-objects";

export class Profile extends AggregateRoot {
    private readonly profileId: ProfileId;
    private readonly firstName: Name;
    private readonly lastName: Name;
    private readonly dateOfBirth: Date;
    private readonly gender: string;

    private middleName?: Name;
    private username?: string;
    private phoneNumber?: string;
    private avatar?: string;

    constructor(
        profileId: ProfileId,
        firstName: Name,
        lastName: Name,
        dateOfBirth: Date,
        gender: string,
        middleName?: Name,
        username?: string,
        phoneNumber?: string,
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