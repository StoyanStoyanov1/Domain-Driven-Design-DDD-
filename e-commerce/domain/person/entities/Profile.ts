import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import {
    Name, ProfileId, Gender, Username, PhoneNumber, DateOfBirth, Avatar
} from "../value-objects";
import { Result } from "../../shared/core";

export class Profile extends AggregateRoot {
    private readonly profileId: ProfileId;
    private readonly firstName: Name;
    private readonly lastName: Name;
    private readonly dateOfBirth: DateOfBirth;

    private gender: Gender;
    private middleName?: Name;
    private username?: Username;
    private phoneNumber?: PhoneNumber;
    private avatar?: Avatar;

    constructor(
        profileId: ProfileId,
        firstName: Name,
        lastName: Name,
        dateOfBirth: DateOfBirth,
        gender: Gender,
        middleName?: Name,
        username?: Username,
        phoneNumber?: PhoneNumber,
        avatar?: Avatar
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

    // Create a new Profile instance
    static create(
        firstName: string,
        lastName: string,
        dateOfBirth: string,
        gender: string,
        middleName?: string,
        username?: string,
        phoneNumber?: string,
        avatar?: string
    ): Result<Profile> {
        try {
            const profile = new Profile(
                ProfileId.create().getValue(),
                Name.create(firstName).getValue(),
                Name.create(lastName).getValue(),
                DateOfBirth.create(dateOfBirth).getValue(),
                Gender.create(gender).getValue(),
                middleName ? Name.create(middleName).getValue() : undefined,
                username ? Username.create(username).getValue() : undefined,
                phoneNumber ? PhoneNumber.create(phoneNumber).getValue() : undefined,
                avatar ? Avatar.create(avatar).getValue() : undefined
            );
            return Result.ok<Profile>(profile);
        } catch (error) {
            return Result.fail<Profile>(error.message);
        }

    }

    //Getters
    getProfileId(): ProfileId {
        return this.profileId;
    }

    getFirstName(): Name {
        return this.firstName;
    }

    getLastName(): Name {
        return this.lastName;
    }

    getMiddleName(): Name | undefined {
        return this.middleName;
    }

    getDateOfBirth(): DateOfBirth {
        return this.dateOfBirth;
    }

    getGender(): Gender {
        return this.gender;
    }   

    getUsername(): Username | undefined {
        return this.username;
    }

    getPhoneNumber(): PhoneNumber | undefined {
        return this.phoneNumber;
    }

    getAvatar(): Avatar | undefined {
        return this.avatar;
    }

    // Setters for optional fields
    setMiddleName(middleName: string): void {
        this.middleName = Name.create(middleName).getValue();
    }

    setUsername(username: string): void {
        this.username = Username.create(username).getValue();
    }

    setPhoneNumber(phoneNumber: string): void {
        this.phoneNumber = PhoneNumber.create(phoneNumber).getValue();
    }

    setAvatar(avatar: string): void {
        this.avatar = Avatar.create(avatar).getValue();
    }

    setGender(gender: string): void {
        this.gender = Gender.create(gender).getValue();
    }

}