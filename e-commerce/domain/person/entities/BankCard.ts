import { Result } from "../../shared/core";
import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { BankCardNumber, BankCardType, BankCardId} from "../value-objects/";

export class BankCard extends AggregateRoot {
    private readonly bankCardId: BankCardId;
    private readonly cardType: BankCardType;
    private readonly cardNumber: BankCardNumber;
    private readonly CVC: string;
    private createdAt: Date = new Date();

    private  isValid: boolean;

    private constructor(
        bankCardId: BankCardId,
        cardType: BankCardType,
        cardNumber: BankCardNumber,
        isValid: boolean,
        CVC: string
    ) {
        super(bankCardId.getValue());
        this.bankCardId = bankCardId;
        this.cardType = cardType;
        this.cardNumber = cardNumber;
        this.isValid = isValid;
        this.CVC = CVC;
    }

    static create(
        cardType: string,
        cardNumber: string,
        isValid: boolean,
        CVC: string
    ): Result<BankCard> {
        try {
            const bankCard = new BankCard(
                BankCardId.create().getValue(),
                BankCardType.create(cardType).getValue(),
                BankCardNumber.create(cardNumber).getValue(),
                isValid,
                CVC
            );
            return Result.ok<BankCard>(bankCard);
        } catch (error: any) {
            return Result.fail<BankCard>(error.message);
        }
    }

    //getters
    get idValue(): string {
        return this.bankCardId.getValue();
    }

    get cardTypeValue(): string {
        return this.cardType.getValue();
    }

    get cardNumberValue(): string {
        return this.cardNumber.getValue();
    }

    get isValidValue(): boolean {
        return this.isValid;
    }

    get cvcValue(): string {
        return this.CVC;
    }  

    get createdAtValue(): Date {
        return this.createdAt;
    }
    
    //setters

    setIsValid(isValid: boolean): void {
        this.isValid = isValid;
    }

}
