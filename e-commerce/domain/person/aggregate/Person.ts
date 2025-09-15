import { AggregateRoot } from "../../shared/domain/AggregateRoot"
import { Profile, Address, BankCard } from "../entities/";
import { PersonId } from "../value-objects";
import { Result } from "../../shared/core/Result";

import { PersonProfileUpdated } from "../events/PersonProfileUpdated";
import { PersonAddressUpdated } from "../events/PersonAddressUpdated";
import { PersonBankCardUpdated } from "../events/PersonBankCardUpdated";

export class Person extends AggregateRoot {
    static readonly ERROR_CREATING_PERSON = 'Error creating person';
    static readonly NOT_FOUND = 'not found!';
    static readonly ERROR_UPDATING = 'Error updating!';

    private readonly personId: PersonId;
    private readonly profile: Profile;
    private readonly addresses: Address[];
    private readonly bankCards: BankCard[];
    private readonly createdAt: Date = new Date();

    private updatedAt: Date = new Date();

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
    get personIdValue(): PersonId {
        return this.personId;
    }

    get profileValue(): Profile {
        return this.profile;
    }

    get addressesValue(): Address[] {
        return this.addresses;
    }

    get bankCardsValue(): BankCard[] {
        return this.bankCards;
    }

    get createdAtValue(): Date {
        return this.createdAt;
    }

    get updatedAtValue(): Date {
        return this.updatedAt;
    }

    //Setters

    addAddress(address: Address): void {
        this.addresses.push(address);
    }

    addBankCard(bankCard: BankCard): void {
        this.bankCards.push(bankCard);
    }

    setUpdatedAt(): void {
        this.updatedAt = new Date();
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

    createNewAddress(
        addressType: string,
        country: string,
        city: string,
        postCode: string,
        street: string,
        buildingNumber?: string,
        apartment?: string,
        isDefault?: boolean,
    ): Result<Address> {
        try {
            if (this.addresses.length === 0) {
                isDefault = true;
            } else if (isDefault) {
                this.addresses.forEach(addr => addr.isDefaultAddress && addr.setIsDefault(false));
            } else {
                isDefault = false;
            }

            const addressResult = Address.create(
                addressType,
                country,
                city,
                postCode,
                street,
                isDefault,
                buildingNumber,
                apartment
            );

            if (addressResult.isFailure) {
                return Result.fail<Address>(addressResult.getError());
            }
            this.updatedAt = new Date();
            this.addAddress(addressResult.getValue());
            return Result.ok<Address>(addressResult.getValue());
        } catch (error) {
            return Result.fail<Address>(error.message);
        }
    }

    createNewBankCard(cardType: string, cardNumber: string, isValid: boolean, cvc: string): Result<BankCard> {
        try {
            const bankCardResult = BankCard.create(cardType, cardNumber, isValid, cvc);
            if (bankCardResult.isFailure) {
                return Result.fail<BankCard>(bankCardResult.getError());
            }

            this.addBankCard(bankCardResult.getValue());
            this.setUpdatedAt();
            return Result.ok<BankCard>(bankCardResult.getValue());
        } catch (error) {
            return Result.fail<BankCard>(error.message);
        }
    }

    updateProfile(
        middleName?: string,
        gender?: string,
        username?: string,
        phoneNumber?: string,
        avatar?: string
    ): void {
        const hasInput = [middleName, gender, username, phoneNumber].some(Boolean);
        if (!hasInput) throw new Error(Person.ERROR_UPDATING);

        const updatedFields: string[] = [];
        if (middleName) { this.profile.setMiddleName(middleName); updatedFields.push('middleName'); }
        if (gender) { this.profile.setGender(gender); updatedFields.push('gender'); }
        if (username) { this.profile.setUsername(username); updatedFields.push('username'); }
        if (phoneNumber) { this.profile.setPhoneNumber(phoneNumber); updatedFields.push('phoneNumber'); }
        if (avatar) { this.profile.setAvatar(avatar); updatedFields.push('avatar'); }
        this.profile.setUpdatedAt();
        this.setUpdatedAt();

        this.addDomainEvent(new PersonProfileUpdated(this.personId.getValue(), updatedFields));

    }

    updateAddress(addressId: string, buildingNumber?: string, apartment?: string): void {
        const address = this.addresses.find(addr => addr.addressIdValue.getValue() === addressId);
        if (!address) throw new Error('Address ' + Person.NOT_FOUND);
        if (!apartment && !buildingNumber) throw new Error(Person.ERROR_UPDATING);

        const updatedFields: string[] = [];
        if (buildingNumber) { address.setBuildingNumber(buildingNumber); updatedFields.push('buildingNumber'); }
        if (apartment) { address.setApartment(apartment); updatedFields.push('apartment'); }
        address.setUpdatedAt();
        this.setUpdatedAt();

        this.addDomainEvent(new PersonAddressUpdated(this.personId.getValue(), addressId, updatedFields));
    }

    updateBankCardStatus(bankCardId: string): void {
        const bankCard = this.bankCards.find(card => card.idValue.getValue() === bankCardId);
        if (!bankCard) throw new Error('BankCard ' + Person.NOT_FOUND);
        bankCard.changeValidStatus();
        bankCard.setUpdatedAt();
        this.setUpdatedAt();

        this.addDomainEvent(new PersonBankCardUpdated(this.personId.getValue(), bankCardId, ['isValid']));
    }

}