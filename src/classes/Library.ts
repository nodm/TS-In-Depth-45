import { setInitial } from '../decorators';

export class Library {
    @setInitial(3) id: number = 0;
    name: string = '';
    address: string = '';

    // constructor(public id: number, public name: string, public address: string) {}
}
