import { Moment } from 'moment';
import { IAddress } from 'app/shared/model/address.model';
import { IContactPhone } from 'app/shared/model/contact-phone.model';
import { IContactEmail } from 'app/shared/model/contact-email.model';

export const enum ContactStatus {
    LEAD = 'LEAD',
    CLIENT = 'CLIENT'
}

export interface IContact {
    id?: number;
    firstName?: string;
    lastName?: string;
    dob?: Moment;
    status?: ContactStatus;
    companyName?: string;
    jobRole?: string;
    position?: string;
    linkedIn?: string;
    fax?: string;
    department?: string;
    address?: IAddress;
    phoneNumbers?: IContactPhone[];
    emailAddresses?: IContactEmail[];
}

export class Contact implements IContact {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public dob?: Moment,
        public status?: ContactStatus,
        public companyName?: string,
        public jobRole?: string,
        public position?: string,
        public linkedIn?: string,
        public fax?: string,
        public department?: string,
        public address?: IAddress,
        public phoneNumbers?: IContactPhone[],
        public emailAddresses?: IContactEmail[]
    ) {}
}
