import { freeze, logger } from '../decorators';
import * as Interfaces from '../interfaces';

@freeze('Hello')
@logger
export class UniversityLibrarian implements Interfaces.Librarian {
    constructor(public name: string, public email: string, public department: string) {
        console.log('>>>', this.name, this.email, this.department);
    }

    assistCustomer(customerName: string, bookTitle: string): void {
        console.log(`${this.name} is assisting ${customerName} with the book ${bookTitle}`);
    }
}
