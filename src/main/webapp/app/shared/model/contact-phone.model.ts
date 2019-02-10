import { IContact } from 'app/shared/model/contact.model';

export interface IContactPhone {
    id?: number;
    number?: string;
    sms?: boolean;
    contact?: IContact;
}

export class ContactPhone implements IContactPhone {
    constructor(public id?: number, public number?: string, public sms?: boolean, public contact?: IContact) {
        this.sms = this.sms || false;
    }
}
