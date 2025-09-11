import {ValueObject} from "../../shared/domain/ValueObject";
import type {DescriptionProps} from "../types";
import {ShortDescription} from "./ShortDescription";
import {Result} from "../../shared/core";
import {FullDescription} from "./FullDescription";


export class Description extends ValueObject<DescriptionProps> {
    static readonly MUST_HAVE_BOTH_ERROR = 'Description must have both short and full description';

    static create(shortRaw: string, fullRaw: string): Result<Description> {
        try {
            const short = ShortDescription.create(shortRaw).getValue();
            const full  = FullDescription.create(fullRaw).getValue();
            return Result.ok(new Description({ short, full }));
        } catch (e: any) {
            return Result.fail(e instanceof Error ? e.message : String(e));
        }
    }

    get short(): ShortDescription { return this.getValue().short; }
    get full(): ShortDescription { return this.getValue().full; }

    toPrimitives() {
        return {
            short: this.short.getValue(),
            full: this.full.getValue(),
        };
    }

    protected validate(value: DescriptionProps): void {
        if (!value.short || !value.full) {
            throw new Error(Description.MUST_HAVE_BOTH_ERROR);
        }
    }
}
