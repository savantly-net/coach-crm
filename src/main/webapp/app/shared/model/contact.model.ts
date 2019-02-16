import { Moment } from 'moment';
import { ISite } from 'app/shared/model/site.model';

export const enum ContactStatus {
    LEAD = 'LEAD',
    CLIENT = 'CLIENT'
}

export interface IContact {
    id?: number;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    emailAddress?: string;
    dob?: Moment;
    status?: ContactStatus;
    companyName?: string;
    jobRole?: string;
    position?: string;
    linkedIn?: string;
    fax?: string;
    department?: string;
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
    site?: ISite;
}

export class Contact implements IContact {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public phoneNumber?: string,
        public emailAddress?: string,
        public dob?: Moment,
        public status?: ContactStatus,
        public companyName?: string,
        public jobRole?: string,
        public position?: string,
        public linkedIn?: string,
        public fax?: string,
        public department?: string,
        public street?: string,
        public city?: string,
        public state?: string,
        public zipcode?: string,
        public country?: string,
        public site?: ISite
    ) {}
}
