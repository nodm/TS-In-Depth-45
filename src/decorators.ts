// A practical guide to TypeScript decorators by Rahman Fadhil
// https://blog.logrocket.com/practical-guide-typescript-decorators/#class-decorators

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
        console.log(...args); // Missed in the decorated class

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

export function writable(isWritable: boolean) {
    return function (originalMethod: Function, context: ClassMethodDecoratorContext) {
        if (context.kind !== 'method') return;

        context.addInitializer(function () {
            Object.defineProperty(Object.getPrototypeOf(this), context.name, {
                writable: isWritable,
                // value: originalMethod,
            });
        });
    };
}

export function timeout(delayMs: number) {
    return function (originalMethod: Function, context: ClassMethodDecoratorContext) {
        if (context.kind !== 'method') return;

        return function replacedMethod(this: any, ...args: unknown[]) {
            // if (window.confirm(`Are you sure you  want tto execute method "${String(context.name)}"?`)) {
            //     setTimeout(() => {
            //         originalMethod.apply(this, ...args);
            //     }, delayMs);
            // }
            setTimeout(() => {
                originalMethod.apply(this, ...args);
            }, delayMs);
        };
    };
}

export function setInitial(inputValue: number) {
    return function (value: undefined, context: ClassFieldDecoratorContext) {
        if (context.kind !== 'field') return;

        return function (initValue: number) {
            return initValue + inputValue;
        };
    };
}

export function format<This, Return>(pref: string) {
    return function (target: ClassAccessorDecoratorTarget<This, Return>, context: ClassAccessorDecoratorContext) {
        if (context.kind !== 'accessor') return;

        return {
            get(this: This): Return {
                return `${pref} ${target.get.call(this)}` as Return;
            },
            set(this: This, value: Return) {
                target.set.call(this, value);
            },
        } as ClassAccessorDecoratorResult<This, Return>;
    };
}

export function positiveInteger(originalSetter: Function, context: ClassSetterDecoratorContext) {
    if (context.kind !== 'setter') return;

    const newSetter = function (this: any, value: number) {
        if (value < 1 && Number.isInteger(value)) throw new Error(`Invalid value (${value})`);

        originalSetter.call(this, value);
    };

    return newSetter;
}
