import { format, freeze, logger, writable } from '../decorators';
import * as Interfaces from '../interfaces';

// @freeze('Hello')
// @logger
export class UniversityLibrarian implements Interfaces.Librarian {
    @format('Mr./Mrs.') public accessor name!: string;
    public email!: string;
    public department!: string;

    // constructor(public name: string, public email: string, public department: string) {
    //     console.log('>>>', this.name, this.email, this.department);
    // }

    assistCustomer(customerName: string, bookTitle: string): void {
        console.log(`${this.name} is assisting ${customerName} with the book ${bookTitle}`);
    }

    @writable(true)
    assistFaculty(): void {
        console.log('Assisting faculty');
    }

    @writable(false)
    teachCommunity(): void {
        console.log('Teaching community');
    }
}
