export default class Shelve<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getFirst(): T | undefined {
        const [firstItem] = this.items;

        return firstItem;
    }
}