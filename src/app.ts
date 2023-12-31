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
    getObjectProperty,
    update,
    getBooksByCategory,
    logCategorySearch,
    getBooksByCategoryPromise,
    logSearchResults,
} from './functions';
import { Logger, Book, Author, Librarian, Magazine } from './interfaces';
import { BookRequiredFields, CreateCustomerFunctionType, PersonBook, UpdatedBook } from './types';

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

console.group('RefBook');
const refBook = new RefBook('Britannica', 2023, 10);
refBook.printItem();
refBook.printCitation();
try {
    console.log('Set number of copies to -10 - shout throw an error');
    refBook.copies = -10;
} catch (e) {
    console.log(e);
}
try {
    console.log('Set number of copies to 0 - shout throw an error');
    refBook.copies = 0;
} catch (e) {
    console.log(e);
}
refBook.copies = 4.5;
refBook.copies = 5;
console.groupEnd();

console.group('Decorating UniversityLibrarian');
// const favoriteLibrarian: Librarian = new UL.UniversityLibrarian('Anna', 'john.smith@gmail.com', 'Fiction');
const favoriteLibrarian: Librarian = new UL.UniversityLibrarian();
favoriteLibrarian.name = 'Anna';
favoriteLibrarian.email = 'a@gmail.com';
favoriteLibrarian.department = 'Fiction';
console.log('Decorated UniversityLibrarian', favoriteLibrarian);
// (favoriteLibrarian as any)?.printLibrarian();
favoriteLibrarian.assistCustomer('Foo Buzz', 'Clean Code');
// (favoriteLibrarian as any).assistFaculty();
// (favoriteLibrarian as any).teachCommunity();
// (favoriteLibrarian as any).teachCommunity = () => {};
console.groupEnd();

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

console.group('Magazine titles:');
magazineShelf.printTitles();
console.groupEnd();

console.group('Find "Five Points" magazine:');
console.log(magazineShelf.find('Five Points'));
console.groupEnd();

console.log(`Magazine\'s title: ${getObjectProperty(magazines[0], 'title')}`);
console.log(`Magazine\'s publisher: ${getObjectProperty(magazines[0], 'publisher')}`);
console.log(`Book\'s author: ${getObjectProperty(getAllBooks()[0], 'author')}`);

const bookRequiredFields: BookRequiredFields = {
    id: 1,
    title: 'Learn TypeScript',
    author: 'Anna',
    available: false,
    category: Category.TypeScript,
    pages: 300,
    markDamaged: (reason: string): void => {
        console.log('Damaged:', reason);
    },
};
console.log('bookRequiredFields:', bookRequiredFields);
const updatedBook: UpdatedBook = {
    id: 1,
};
console.log('Updated book:', updatedBook);

const params: Parameters<CreateCustomerFunctionType> = ['Anna'];
createCustomer(...params);

const u1 = update(true); // string
const u2 = update(false); // number

console.group('Property decorator for Library');
console.log(new Library());
console.groupEnd();

console.group('Call logCategorySearch with JavaScript');
getBooksByCategory(Category.JavaScript, logCategorySearch);
console.groupEnd();
console.group('Call logCategorySearch with Software');
getBooksByCategory(Category.Software, logCategorySearch);
console.groupEnd();

console.log('Calling getBooksByCategoryPromise with "Software"');
getBooksByCategoryPromise(Category.Software)
    .then(titles => {
        console.log('Titles for the "Software" category:', titles);
    })
    .catch(error => {
        console.log('No title found for the "Software" category:', error?.message);
    });
console.log('Calling getBooksByCategoryPromise with "JavaScript"');
getBooksByCategoryPromise(Category.JavaScript)
    .then(titles => {
        console.log('Titles for the "JavaScript" category:', titles);
        return titles.length;
    })
    .then(numberOfTitles => {
        console.log(`${numberOfTitles} book(s) found.`);
    })
    .catch(error => {
        console.log('No title found for the "JavaScript" category:', error?.message);
    });

console.log('Before calling "logSearchResults"');
logSearchResults(Category.JavaScript);
console.log('After calling "logSearchResults"');
