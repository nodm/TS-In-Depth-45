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

type Book = {
    id: number;
    category: Category;
    title: string;
    author: string;
    available: boolean;
};

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

export function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    const { title, author } = books[index] ?? ({} as Book);

    return [title, author];
}
console.log('Book with index -1', getBookAuthorByIndex(-1));
console.log('Book with index 1', getBookAuthorByIndex(1));

export function calcTotalPages(): bigint {
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

function getBookByID(id: number): Book | undefined {
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
