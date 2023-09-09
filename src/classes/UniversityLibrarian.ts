import { freeze } from '../decorators';
import * as Interfaces from '../interfaces';

@freeze('Hello')
export class UniversityLibrarian implements Interfaces.Librarian {
    constructor(public name: string, public email: string, public department: string) {}

    assistCustomer(customerName: string, bookTitle: string): void {
        console.log(`${this.name} is assisting ${customerName} with the book ${bookTitle}`);
    }
}
