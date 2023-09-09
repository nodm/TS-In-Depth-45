import { ShelfItem } from '../interfaces';

export default class Shelf<in out T extends ShelfItem> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getFirst(): T | undefined {
        const [firstItem] = this.items;

        return firstItem;
    }

    find(title: string): T | undefined {
        return this.items.find(item => item.title === title);
    }

    printTitles(): void {
        this.items.forEach(item => {
            console.log(item.title);
        });
    }
}
