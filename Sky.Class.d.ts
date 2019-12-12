type PlainShape = { [k: string]: any } & Object;

declare type ClassTypeInterface = Function & {
    (...constructorArguments: any[]): PlainShape;
    new(...constructorArguments: any[]): PlainShape;
    parent: ClassTypeInterface | undefined;
};

declare interface ClassConstructionInterface {
    (...args: PlainShape[]): ClassTypeInterface;
    extend(...args: PlainShape[]): ClassTypeInterface;
    new(...args: PlainShape[]): ClassTypeInterface;
}

declare const Class: ClassConstructionInterface;

export default Class;