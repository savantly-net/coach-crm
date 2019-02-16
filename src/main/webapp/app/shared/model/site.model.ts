import { IContact } from 'app/shared/model/contact.model';

export interface ISite {
    id?: number;
    name?: string;
    emailAddress?: string;
    phoneNumber?: string;
    altPhoneNumber?: string;
    fax?: string;
    website?: string;
    industry?: string;
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
    primaryContact?: IContact;
    otherContacts?: IContact[];
}

export class Site implements ISite {
    constructor(
        public id?: number,
        public name?: string,
        public emailAddress?: string,
        public phoneNumber?: string,
        public altPhoneNumber?: string,
        public fax?: string,
        public website?: string,
        public industry?: string,
        public street?: string,
        public city?: string,
        public state?: string,
        public zipcode?: string,
        public country?: string,
        public primaryContact?: IContact,
        public otherContacts?: IContact[]
    ) {}
}
