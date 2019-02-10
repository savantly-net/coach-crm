import { IContact } from 'app/shared/model/contact.model';
import { ISite } from 'app/shared/model/site.model';

export interface IAddress {
    id?: number;
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
    contact?: IContact;
    site?: ISite;
}

export class Address implements IAddress {
    constructor(
        public id?: number,
        public street?: string,
        public city?: string,
        public state?: string,
        public zipcode?: string,
        public country?: string,
        public contact?: IContact,
        public site?: ISite
    ) {}
}
