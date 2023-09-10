import { createCustomer, getBooksByCategoryPromise } from './functions';
import { Author, Book, Person } from './interfaces';

export type BookProperties = keyof Book;

export type PersonBook = Person & Book;

export type BookOrUndefined = Book | undefined;

export type BookRequiredFields = Required<Book>;

export type UpdatedBook = Partial<Book>;

export type AuthorWoEmail = Omit<Author, 'email'>;

export type CreateCustomerFunctionType = typeof createCustomer;

export type fn = (p1: string, p2: number, p3: boolean) => symbol;
export type Param1<T> = T extends (p1: infer R, p2: number, p3: boolean) => symbol ? R : never;
export type Param2<T> = T extends (p1: string, p2: infer R, p3: boolean) => symbol ? R : never;
export type Param3<T> = T extends (p1: string, p2: number, p3: infer R) => symbol ? R : never;

export type RequiredProps<T extends object> = {
    [prop in keyof T]: {} extends Pick<T, prop> ? never : prop;
};
export type OptionalProps<T extends object> = {
    [prop in keyof T]: {} extends Pick<T, prop> ? prop : never;
};

export type Book2 = NonNullable<RequiredProps<Book>>;
export type BookRequiredProps = NonNullable<RequiredProps<Book>>[keyof Book2];

export type Book3 = NonNullable<OptionalProps<Book>>;
export type BookOptionalProps = Book3[keyof Book3];

export type RemoveProps<T extends object, TProps extends keyof T> = {
    [prop in keyof T as Exclude<prop, TProps>]: T[prop];
};

export type UpdateResult<T> = T extends true ? string : number;

export type Unpromisify<T> = T extends Promise<infer U> ? U : never;

// export type fnPromise = ReturnType<typeof getBooksByCategoryPromise>;
export type fnPromise = Unpromisify<ReturnType<typeof getBooksByCategoryPromise>>;
