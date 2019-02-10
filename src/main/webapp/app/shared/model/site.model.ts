import { IContact } from 'app/shared/model/contact.model';
import { IAddress } from 'app/shared/model/address.model';

export interface ISite {
    id?: number;
    name?: string;
    phoneNumber?: string;
    altPhoneNumber?: string;
    fax?: string;
    website?: string;
    industry?: string;
    primaryContact?: IContact;
    otherContacts?: IContact;
    address?: IAddress;
}

export class Site implements ISite {
    constructor(
        public id?: number,
        public name?: string,
        public phoneNumber?: string,
        public altPhoneNumber?: string,
        public fax?: string,
        public website?: string,
        public industry?: string,
        public primaryContact?: IContact,
        public otherContacts?: IContact,
        public address?: IAddress
    ) {}
}
