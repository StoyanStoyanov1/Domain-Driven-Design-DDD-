import { StatusChoices } from "./";

export interface ProductUpdateProps {
    name?: string;
    shortDescription?: string;
    fullDescription?: string;
    price?: number;
    status?: StatusChoices;
}