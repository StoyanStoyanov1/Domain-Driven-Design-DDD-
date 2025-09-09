import {ProfileId} from "../../profile/value-object";

export class CustomerId extends ProfileId {
    constructor(profileId: ProfileId) {
        super(profileId);
    }
}