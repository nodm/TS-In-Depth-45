export function freeze(p: string) {
    return function (originalClass: Function, { kind, name }: ClassDecoratorContext): void {
        // if (kind !== 'class') throw new TypeError('The "freeze" decorator must be applied to the class');
        if (kind === 'class') {
            console.log(`Freezing the constructor ${p} ${name}`);
            Object.freeze(originalClass);
            Object.freeze(originalClass.prototype);
        }
    };
}
