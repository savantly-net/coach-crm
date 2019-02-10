import { IContact } from 'app/shared/model/contact.model';

export interface IContactEmail {
    id?: number;
    address?: string;
    confirmed?: boolean;
    primary?: boolean;
    contact?: IContact;
}

export class ContactEmail implements IContactEmail {
    constructor(
        public id?: number,
        public address?: string,
        public confirmed?: boolean,
        public primary?: boolean,
        public contact?: IContact
    ) {
        this.confirmed = this.confirmed || false;
        this.primary = this.primary || false;
    }
}
