import { RefBook, UL, Library, Shelf } from './classes';
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
    printRefBook,
    purge,
} from './functions';
import { Logger, Book, Author, Librarian, Magazine } from './interfaces';
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

const refBook = new RefBook('Britannica', 2023, 10);
refBook.printItem();
refBook.printCitation();

const favoriteLibrarian: Librarian = new UL.UniversityLibrarian('John Smith', 'john.smith@gmail.com', 'Fiction');
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

console.group('printRefBook:');
printRefBook(refBook);
console.groupEnd();

console.group('printRefBook for favoriteLibrarian:');
try {
    printRefBook(favoriteLibrarian);
} catch (e) {
    console.log(e);
}
console.groupEnd();

const flag = true;
if (flag) {
    // import('./classes').then((module) => {
    //   const reader = new module.Reader();
    //   reader.name = 'Anna';
    //   console.log(reader);
    // });
    const module = await import('./classes');
    const reader = new module.Reader();
    reader.name = 'Anna';
    console.log(reader);
}

// const library: Library = new Library(1, 'John Smith', 'Baker St., 223B');
const library: Library = {
    id: 1,
    name: 'John Smith',
    address: 'Baker St., 223B',
};
console.log('Library:', library);

const inventory = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software },
];
// console.log('Purge inventory:', purge<(typeof inventory)[number]>(inventory));
// console.log('Purge numbers:', purge<number>([1, 2, 3, 4, 5]));
// const purgeNumbers = purge<number>;
// console.log('Call "purgeNumbers" with number array:', purgeNumbers([1, 2, 3, 4, 5]));
// // console.log('Call "purgeNumbers" with array of strings:', purgeNumbers(['1', '2', '3', '4', '5']));

const bookShelve = new Shelf<(typeof inventory)[number]>();
inventory.forEach(item => {
    bookShelve.add(item);
});
console.log('Firs book on the shelve:', bookShelve.getFirst());
const magazines: Magazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' },
];
const magazineShelf = new Shelf<Magazine>();
magazines.forEach(item => {
    magazineShelf.add(item);
});
console.log('Firs magazine on  the shelve:', magazineShelf.getFirst());
