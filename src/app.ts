/* eslint-disable no-redeclare */

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt!.innerText = `Hello from ${name}`;
}

enum Category {
    JavaScript = 'JavaScript',
    CSS = 'CSS',
    HTML = 'HTML',
    TypeScript = 'TypeScript',
    Angular = 'Angular',
}

interface DamageLogger {
    (reason: string): void;
}

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    markDamaged?: DamageLogger;
}

function getAllBooks(): readonly Book[] {
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

function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
    console.log('Number of books', books.length);

    const firstAvailableBook = books.find(({ available }) => available);
    if (!firstAvailableBook) {
        console.log('Available book is not found');
    }

    console.log('First available book', firstAvailableBook);
}
logFirstAvailable(getAllBooks());
console.groupCollapsed('Log first available book without argument');
logFirstAvailable();
console.groupEnd();

function getBookTitlesByCategory(category: Category = Category.JavaScript): string[] {
    return getAllBooks()
        .filter(({ category: bookCategory }) => bookCategory === category)
        .map(({ title }) => title);
}

function logBookTitles(titles: string[]): void {
    console.log('Book titles:');

    if (!titles.length) {
        console.log('\t', 'Not found');
    }

    titles.forEach(title => {
        console.log('\t', title);
    });
}

logBookTitles(getBookTitlesByCategory(Category.JavaScript));
console.groupCollapsed('Call getBookTitlesByCategory without argument');
logBookTitles(getBookTitlesByCategory());
console.groupEnd();

function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    const { title, author } = books[index] ?? ({} as Book);

    return [title, author];
}
console.log('Book with index -1', getBookAuthorByIndex(-1));
console.log('Book with index 1', getBookAuthorByIndex(1));

function calcTotalPages(): bigint {
    const data = <const>[
        { lib: 'libName', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName', books: 3_000_000_000, avgPagesPerBook: 280 },
    ];

    return data.reduce((pages, { books, avgPagesPerBook }) => pages + BigInt(books) * BigInt(avgPagesPerBook), 0n);
}
console.log('Total number of pages:', calcTotalPages());

function createCustomerID(name: string, id: number): string {
    return `${name}_${id}`;
}
const myID = createCustomerID('Ann', 10);
console.log('myID:', myID);

let idGenerator: typeof createCustomerID = (name: string, id: number): string => {
    return `${name}-${id}`;
};
console.log('Call idGenerator (as an arrow function):', idGenerator('Foo', 20));
idGenerator = createCustomerID;
console.log('Call idGenerator (as createCustomerID):', idGenerator('Buzz', 30));

function createCustomer(name: string, age?: number, city?: string) {
    console.groupCollapsed('Create customer');
    console.log('Customer name:', name);
    if (age) console.log('Age:', age);
    if (city) console.log('City:', city);
    console.groupEnd();
}
createCustomer('Anna');
createCustomer('Foo', 18);
createCustomer('Buzz', 28, 'Kyiv');

function getBookByID(id: Book['id']): BookOrUndefined {
    const books = getAllBooks();
    return books.find(({ id: bookID }) => bookID === id);
}
console.log('A book with ID=1', getBookByID(1));

function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log('Customer name:', customer);

    return bookIDs
        .map(id => getBookByID(id))
        .filter(book => book?.available)
        .map(book => book!.title);
}
console.groupCollapsed('Available books:');
const myBooks = checkoutBooks('Ann', 1, 2, 4);
console.log(myBooks);
console.groupEnd();

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];
function getTitles(...args: [string | boolean] | [number, boolean]): string[] {
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
const checkedOutBooks = getTitles(false);
console.log('The list of unavailable books:', checkedOutBooks);

function assertString(value: unknown): asserts value is string {
    if (typeof value !== 'string') throw new TypeError('Value should be a string');
}

function bookTitleTransform(title: unknown) {
    assertString(title);

    return [...title].reverse().join('');
}
console.log('Transform book title "Refactoring JavaScript"', bookTitleTransform('Refactoring JavaScript'));
try {
    bookTitleTransform(123);
} catch (e) {
    console.log('Transform book title 123', e);
}

function printBook(book: Book): void {
    console.log(`"${book.title}" by ${book.author}`);
}

const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    // year: 2015,
    // copies: 3,
    pages: 200,
    markDamaged: (reason: string) => {
        console.log(`Damaged: ${reason}`);
    },
};
printBook(myBook);
myBook.markDamaged?.('Missing back cover');

const logDamage: DamageLogger = (reason: string) => {
    console.log('Damage reason:', reason);
};
logDamage('Foo buzz');

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string, bookTitle: string) => void;
}

const favoriteAuthor: Author = {
    name: 'Robert Cecil Martin',
    email: 'rcm@gmail.com',
    numBooksPublished: 3,
};
// const favoriteLibrarian: Librarian = {
//     name: 'John Smith',
//     email: 'john.smith@gmail.com',
//     department: 'Fiction',
//     assistCustomer: (custName: string, bookTitle: string) => {
//         console.log(`Assisting ${custName} with "${bookTitle}"`);
//     },
// };

const offer: any = {
    book: {
        title: 'Essential TypeScript',
    },
};
console.log('offer.magazine', offer?.magazine);
console.log('offer.magazine.getTitle()', offer.magazine?.getTitle?.());
console.log('offer.book.getTitle()', offer.book?.getTitle?.());
console.log('offer.book.authors[0]', offer.book?.authors?.[0]);
console.log('offer.book.authors[0].name', offer.book?.authors?.[0]?.name);

type BookProperties = keyof Book;

function getProperty(book: Book, prop: BookProperties): string | any {
    if (typeof book[prop] === 'function') {
        return (book[prop] as Function).name;
    } else {
        return book[prop];
    }
}
console.groupCollapsed('getProperty');
console.log('title:', getProperty(myBook, 'title'));
console.log('markDamaged:', getProperty(myBook, 'markDamaged'));
// console.log('isbn:', getProperty(myBook, 'isbn'));
console.groupEnd();

abstract class ReferenceItem {
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
        this.#id = Math.ceil(Math.random() * 1_000);
    }

    printItem() {
        console.log(`"${this.title}" was published in ${this.year} (Dep. ${ReferenceItem.department})`);
    }

    getID(): number {
        return this.#id;
    }

    abstract printCitation(): void;
}
// const ref = new ReferenceItem('Clean Code', 2023);
// ref.printItem();
// ref.publisher = 'Collins';
// console.log('Publisher:', ref.publisher);

// console.log('ref =', ref);
// console.log('ref ID =', ref.getID());

class Encyclopedia extends ReferenceItem {
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
const refBook = new Encyclopedia('Britannica', 2023, 10);
refBook.printItem();
refBook.printCitation();

class UniversityLibrarian implements Librarian {
    constructor(public name: string, public email: string, public department: string) {}

    assistCustomer(custName: string, bookTitle: string): void {
        console.log(`${this.name} is assisting ${custName} with the book ${bookTitle}`);
    }
}
const favoriteLibrarian: Librarian = new UniversityLibrarian('John Smith', 'john.smith@gmail.com', 'Fiction');
favoriteLibrarian.assistCustomer('Foo Buzz', 'Clean Code');

type PersonBook = Person & Book;
const personBook: PersonBook = {
    name: 'Foo Buzz',
    email: 'fb@gmail.com',
    id: 987,
    title: 'Clean Code',
    author: 'Uncle Bob',
    available: true,
    category: Category.JavaScript,
    pages: 321,
    // markDamaged?: DamageLogger;
};
console.log('personBook:', personBook);

type BookOrUndefined = Book | undefined;

interface TOptions {
    duration?: number;
    speed?: number;
}
function setDefaultConfig(options: TOptions) {
    return {
        duration: options.duration ?? 3,
        speed: options.speed ?? 50,
    };
}
