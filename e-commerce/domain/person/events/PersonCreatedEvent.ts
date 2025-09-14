import { DomainEvent } from "../../shared/events/DomainEvent";
import { Profile, Address, BankCard } from "../entities";
import { PersonId } from "../value-objects/";

export class PersonCreatedEvent extends DomainEvent {

    static EVENT_NAME = 'PersonCreated';
    private readonly personId: PersonId;
    private readonly profile: Profile;
    private readonly addresses: Address[];
    private readonly bankCards: BankCard[];
    private readonly createdAt: Date = new Date();

    constructor(personId: PersonId, profile: Profile, addresses: Address[], bankCards: BankCard[]) {
        super();
        this.personId = personId;
        this.profile = profile;
        this.addresses = addresses;
        this.bankCards = bankCards;
    }

    getEventName(): string {
        return PersonCreatedEvent.EVENT_NAME;
    }

    getAggregateId(): string {
        return this.personId.getValue();
    }

    public toPrimitives(): any {
        return {
            ...super.toPrimitives(),
            personId: this.personId.getValue(),
            profile: {
                profileId: this.profile.profileIdValue.getValue(),
                firstName: this.profile.firstNameValue.getValue(),
                lastName: this.profile.lastNameValue.getValue(),
                middleName: this.profile.middleNameValue ? this.profile.middleNameValue.getValue() : null,
                dateOfBirth: this.profile.dateOfBirthValue.getValue().toISOString(),

            },
            addresses: this.addresses.map(address => ({
                addressId: address.addressIdValue.getValue(),
                type: address.addressTypeValue.getValue(),
                country: address.countryValue.getValue(),
                city: address.cityValue.getValue(),
                street: address.streetValue.getValue(),
                postalCode: address.postCodeValue.getValue(),
                createdAt: address.createdAtValue.toISOString(),
                updatedAt: address.updatedAtValue.toISOString()
            })),
            bankCards: this.bankCards.map(card => ({
                bankCardId: card.idValue.getValue(),
                cardType: card.cardTypeValue.getValue(),
                cardNumber: card.cardNumberValue.getValue(),
                cvc: card.cvcValue,
                createdAt: card.createdAtValue.toISOString(),
            })),
            createdAt: this.createdAt.toISOString()
        };
    }
}