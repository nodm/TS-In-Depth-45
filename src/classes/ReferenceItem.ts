import { timeout } from '../decorators';

export abstract class ReferenceItem {
    static department: string = 'Fiction';
    // title: string;
    // year: number;
    private _publisher: string = '';
    public get publisher(): string {
        // eslint-disable-next-line no-underscore-dangle
        return this._publisher.toUpperCase();
    }
    public set publisher(value: string) {
        // eslint-disable-next-line no-underscore-dangle
        this._publisher = value;
    }

    #id: number;

    // constructor(newTitle: string, newYear: number) {
    //     console.log('Creating a new ReferenceItem...');
    //     this.title = newTitle;
    //     this.year = newYear;
    // }
    constructor(public title: string, protected year: number) {
        this.#id = Math.ceil(Math.random() * 1000);
    }

    @timeout(1_000)
    printItem() {
        console.log(`"${this.title}" was published in ${this.year} (Dep. ${ReferenceItem.department})`);
    }

    getID(): number {
        return this.#id;
    }

    abstract printCitation(): void;
}
