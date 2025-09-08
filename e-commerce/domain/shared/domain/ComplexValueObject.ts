export abstract class ComplexValueObject<T extends Record<string, any>> {
    protected readonly props: T;

    protected constructor(props: T) {
        this.validate(props);
        this.props = Object.freeze(props);
    }

    protected abstract validate(props: T): void;

    public getProps(): T {
        return this.props;
    }

    public equals(other: ComplexValueObject<T>): boolean {
        if (!(other instanceof this.constructor)) {
            return false;
        }
        return JSON.stringify(this.props) === JSON.stringify(other.props);
    }
}