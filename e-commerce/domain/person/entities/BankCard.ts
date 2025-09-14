import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { BankCardNumber, BankCardType, BankCardId} from "../value-objects/";

export class BankCard extends AggregateRoot {
    private readonly bankCardId: BankCardId;
    private readonly cardType: BankCardType;
    private readonly cardNumber: BankCardNumber;
    private readonly isValid: boolean;
    private readonly CVC: string;

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

    
}
