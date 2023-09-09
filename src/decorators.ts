export function freeze(p: string) {
    return function (originalClass: Function, { kind, name }: ClassDecoratorContext): void {
        // if (kind !== 'class') throw new TypeError('The "freeze" decorator must be applied to the class');
        if (kind !== 'class') return;

        console.log(`Freezing the constructor ${p} ${name}`);
        Object.freeze(originalClass);
        Object.freeze(originalClass.prototype);
    };
}

export function logger(originalClass: Function, { kind }: ClassDecoratorContext) {
    // if (kind !== 'class') throw new TypeError('The "logger" decorator must be applied to the class');
    if (kind !== 'class') return;

    const newConstructor: any = function (this: any, ...args: any[]) {
        console.log('Creating new instance');
        console.log(originalClass.name);
        console.log(...args);

        // originalClass.apply(this, args);
        this.age = 30;
    };

    newConstructor.prototype = Object.create(originalClass.prototype);
    // Object.setPrototypeOf(newConstructor.prototype, originalClass.prototype);

    newConstructor.prototype.printLibrarian = function () {
        console.log(`Librarian name: ${this.name}, age: ${this.age}`);
    };

    return newConstructor;
}
