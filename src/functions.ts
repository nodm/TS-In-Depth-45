/* eslint-disable no-redeclare */

import RefBook from './classes/Encyclopedia';
import { Category } from './enums';
import { Book, TOptions } from './interfaces';
import { BookOrUndefined, BookProperties, UpdateResult } from './types';

export function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt!.innerText = `Hello from ${name}`;
}

export function getAllBooks(): readonly Book[] {
    return <const>[
        {
            id: 1,
            category: Category.JavaScript,
            title: 'Refactoring JavaScript',
            author: 'Evan Burchard',
            available: true,
        },
        {
            id: 2,
            category: Category.JavaScript,
            title: 'JavaScript Testing',
            author: 'Liang Yuxian Eugene',
            available: false,
        },
        { id: 3, category: Category.CSS, title: 'CSS Secrets', author: 'Lea Verou', available: true },
        {
            id: 4,
            category: Category.JavaScript,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            available: true,
        },
    ];
}

export function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
    console.log('Number of books', books.length);

    const firstAvailableBook = books.find(({ available }) => available);
    if (!firstAvailableBook) {
        console.log('Available book is not found');
    }

    console.log('First available book', firstAvailableBook);
}

export function getBookTitlesByCategory(category: Category = Category.JavaScript): string[] {
    return getAllBooks()
        .filter(({ category: bookCategory }) => bookCategory === category)
        .map(({ title }) => title);
}

export function logBookTitles(titles: string[]): void {
    console.log('Book titles:');

    if (!titles.length) {
        console.log('\t', 'Not found');
    }

    titles.forEach(title => {
        console.log('\t', title);
    });
}

export function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    const { title, author } = books[index] ?? ({} as Book);

    return [title, author];
}

export function calcTotalPages(): bigint {
    const data = <const>[
        { lib: 'libName', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName', books: 3_000_000_000, avgPagesPerBook: 280 },
    ];

    return data.reduce((pages, { books, avgPagesPerBook }) => pages + BigInt(books) * BigInt(avgPagesPerBook), 0n);
}

export function createCustomerID(name: string, id: number): string {
    return `${name}_${id}`;
}

export function createCustomer(name: string, age?: number, city?: string) {
    console.groupCollapsed('Create customer');
    console.log('Customer name:', name);
    if (age) console.log('Age:', age);
    if (city) console.log('City:', city);
    console.groupEnd();
}

export function getBookByID(id: Book['id']): BookOrUndefined {
    const books = getAllBooks();
    return books.find(({ id: bookID }) => bookID === id);
}

export function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log('Customer name:', customer);

    return bookIDs
        .map(id => getBookByID(id))
        .filter(book => book?.available)
        .map(book => book!.title);
}

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: [string | boolean] | [number, boolean]): string[] {
    const books = getAllBooks();

    if (args.length === 2) {
        const [id, available] = args;
        return books.filter(book => book.available === available && book.id === id).map(({ title }) => title);
    }

    const [arg] = args;
    if (typeof arg === 'string') {
        return books.filter(book => book.author === arg).map(({ title }) => title);
    }

    return books.filter(book => book.available === arg).map(({ title }) => title);
}

export function assertString(value: unknown): asserts value is string {
    if (typeof value !== 'string') throw new TypeError('Value should be a string');
}

export function bookTitleTransform(title: unknown) {
    assertString(title);

    return [...title].reverse().join('');
}

export function printBook(book: Book): void {
    console.log(`"${book.title}" by ${book.author}`);
}

export function getProperty(book: Book, prop: BookProperties): string | any {
    if (typeof book[prop] === 'function') {
        return (book[prop] as Function).name;
    }

    return book[prop];
}

export function setDefaultConfig(options: TOptions) {
    return {
        duration: options.duration ?? 3,
        speed: options.speed ?? 50,
    };
}

export function assertRefBookInstance(condition: any): asserts condition {
    if (!condition) throw new Error('It is not an instance of RefBook');
}

export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);

    data.printItem();
}

export function purge<T>(inventory: T[]): T[] {
    return inventory.slice(2);
}

export function getObjectProperty<TObject extends object, TKey extends keyof TObject>(
    obj: TObject,
    prop: TKey,
): TObject[TKey] | string {
    if (typeof obj[prop] === 'function') {
        return (obj[prop] as Function).name;
    }

    return obj[prop];
}

export function update<T extends boolean>(p: T): UpdateResult<T> {
    if (p) return 'abc' as UpdateResult<T>;

    return 10 as UpdateResult<T>;
}
