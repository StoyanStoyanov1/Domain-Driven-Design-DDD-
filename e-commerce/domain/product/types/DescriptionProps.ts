import {FullDescription, ShortDescription} from "../value-object";

export type DescriptionProps = Readonly<{
    short: ShortDescription;
    full: FullDescription;
}>;