import { ReferenceItem, UniversityLibrarian } from './classes';
import { Category } from './enums';
import {
    showHello,
    logFirstAvailable,
    logBookTitles,
    getAllBooks,
    getBookTitlesByCategory,
    getBookAuthorByIndex,
    calcTotalPages,
    createCustomerID,
    createCustomer,
    printBook,
    getProperty,
    checkoutBooks,
    getBookByID,
    getTitles,
    bookTitleTransform,
} from './functions';
import { Logger, Book, Person, Author, Librarian, TOptions } from './interfaces';
import { PersonBook } from './types';

showHello('greeting', 'TypeScript');

logFirstAvailable(getAllBooks());
console.groupCollapsed('Log first available book without argument');
logFirstAvailable();
console.groupEnd();

logBookTitles(getBookTitlesByCategory(Category.JavaScript));
console.groupCollapsed('Call getBookTitlesByCategory without argument');
logBookTitles(getBookTitlesByCategory());
console.groupEnd();

console.log('Book with index -1', getBookAuthorByIndex(-1));
console.log('Book with index 1', getBookAuthorByIndex(1));

console.log('Total number of pages:', calcTotalPages());

const myID = createCustomerID('Ann', 10);
console.log('myID:', myID);

let idGenerator: typeof createCustomerID = (name: string, id: number): string => {
    return `${name}-${id}`;
};
console.log('Call idGenerator (as an arrow function):', idGenerator('Foo', 20));
idGenerator = createCustomerID;
console.log('Call idGenerator (as createCustomerID):', idGenerator('Buzz', 30));

createCustomer('Anna');
createCustomer('Foo', 18);
createCustomer('Buzz', 28, 'Kyiv');

console.log('A book with ID=1', getBookByID(1));

console.groupCollapsed('Available books:');
const myBooks = checkoutBooks('Ann', 1, 2, 4);
console.log(myBooks);
console.groupEnd();

const checkedOutBooks = getTitles(false);
console.log('The list of unavailable books:', checkedOutBooks);

console.log('Transform book title "Refactoring JavaScript"', bookTitleTransform('Refactoring JavaScript'));
try {
    bookTitleTransform(123);
} catch (e) {
    console.log('Transform book title 123', e);
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

const logDamage: Logger = (reason: string) => {
    console.log('Damage reason:', reason);
};
logDamage('Foo buzz');

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

console.groupCollapsed('getProperty');
console.log('title:', getProperty(myBook, 'title'));
console.log('markDamaged:', getProperty(myBook, 'markDamaged'));
// console.log('isbn:', getProperty(myBook, 'isbn'));
console.groupEnd();

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

const favoriteLibrarian: Librarian = new UniversityLibrarian('John Smith', 'john.smith@gmail.com', 'Fiction');
favoriteLibrarian.assistCustomer('Foo Buzz', 'Clean Code');

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
