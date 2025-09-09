import {ProfileId, Name, Email} from "../value-object"; // Fields

class Profile {
    private readonly id: ProfileId;
    private readonly name: Name;
    private readonly email: Email;
    private readonly phoneNumber: string;
    private readonly username: string;
    private readonly dateOfBirth: Date;
    private readonly address: string;
    private readonly createdAt: Date;

    readonly updatedAt: Date;
    
    constructor(
        id: ProfileId,
        name: Name,
        email: Email,
        phoneNumber: string,
        username: string,
        dateOfBirth: Date,
        address: string,
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


// Id ( UUID ) - ready
// First name
// Middle Name ( Optional )
// Last Name
// Phone number
// Username ( Optional )
// Avatar
// Date of birth
// Gender
// AuditLog History
// CreateAt
// UpdateAt
// CreatedBy: UserId
// UpdatedBy: UserId