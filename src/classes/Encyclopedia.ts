import { positiveInteger } from '../decorators';
import { ReferenceItem } from './ReferenceItem';

class Encyclopedia extends ReferenceItem {
    private copiesNumber: number = 0;
    get copies(): number {
        return this.copiesNumber;
    }
    @positiveInteger
    set copies(value: number) {
        this.copiesNumber = value;
    }

    constructor(title: string, year: number, public edition: number) {
        super(title, year);
    }

    override printItem(): void {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`);
    }

    override printCitation(): void {
        console.log(`"${this.title}" - ${this.year}`);
    }
}

export default Encyclopedia;
