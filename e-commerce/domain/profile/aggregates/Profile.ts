import {ProfileId, Name, Email, PhoneNumber, Username, Address} from "../value-object"; // Fields

export class Profile {
    private readonly id: ProfileId;
    private readonly name: Name;
    private readonly email: Email;
    private readonly phoneNumber: PhoneNumber;
    private readonly username: Username;
    private readonly dateOfBirth: Date;
    private readonly address: Address;
    private readonly createdAt: Date;

    readonly updatedAt: Date;
    
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
}
