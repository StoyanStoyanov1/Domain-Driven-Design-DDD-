import { AggregateRoot } from "../../shared/domain/AggregateRoot"
import { Profile, Address, BankCard } from "../entities/";
import { PersonId } from "../value-objects";
import { Result } from "../../shared/core/Result";

export class Person extends AggregateRoot {
    static readonly ERROR_CREATING_PERSON = 'Error creating person';

    private readonly personId: PersonId;
    private readonly profile: Profile;
    private addresses: Address[];
    private bankCards: BankCard[];

    constructor(
        personId: PersonId,
        profile: Profile,
    ) {
        super(personId.getValue());
        this.personId = personId;
        this.profile = profile;
        this.addresses = [];
        this.bankCards = [];
    }

    //Getters
    getPersonId(): PersonId {
        return this.personId;
    }

    getProfile(): Profile {
        return this.profile;
    }

    getAddresses(): Address[] {
        return this.addresses;
    }

    getBankCards(): BankCard[] {
        return this.bankCards;
    }

    //Setters

    addAddress(address: Address): void {
        this.addresses.push(address);
    }

    addBankCard(bankCard: BankCard): void {
        this.bankCards.push(bankCard);
    }

    static create(
        firstName: string,
        lastName: string,
        dateOfBirth: string,
        gender: string,
        middleName?: string,
        username?: string,
        phoneNumber?: string,
        avatar?: string
    ): Result<Person> {
        try {
            const personId = PersonId.create();
            const profile = Profile.create(
                firstName,
                lastName,
                dateOfBirth,
                gender,
                middleName,
                username,
                phoneNumber,
                avatar
            );

            if (profile.isFailure) {
                return Result.fail<Person>(profile.getError());
            }

            const person = new Person(personId.getValue(), profile.getValue());
            return Result.ok(person);
        } catch (error) {
            console.error(Person.ERROR_CREATING_PERSON, error);
            return Result.fail(Person.ERROR_CREATING_PERSON);
        }
    }
}