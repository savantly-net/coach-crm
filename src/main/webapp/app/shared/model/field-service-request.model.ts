import { Moment } from 'moment';
import { IFieldServiceType } from 'app/shared/model/field-service-type.model';
import { IContact } from 'app/shared/model/contact.model';
import { IUpload } from 'app/shared/model/upload.model';

export const enum FieldServiceStatus {
    PROPOSAL = 'PROPOSAL',
    CONTRACT = 'CONTRACT'
}

export interface IFieldServiceRequest {
    id?: number;
    status?: FieldServiceStatus;
    contractDate?: Moment;
    startDate?: Moment;
    finishDate?: Moment;
    description?: string;
    total?: number;
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
    fieldServiceType?: IFieldServiceType;
    requestor?: IContact;
    documents?: IUpload[];
}

export class FieldServiceRequest implements IFieldServiceRequest {
    constructor(
        public id?: number,
        public status?: FieldServiceStatus,
        public contractDate?: Moment,
        public startDate?: Moment,
        public finishDate?: Moment,
        public description?: string,
        public total?: number,
        public street?: string,
        public city?: string,
        public state?: string,
        public zipcode?: string,
        public country?: string,
        public fieldServiceType?: IFieldServiceType,
        public requestor?: IContact,
        public documents?: IUpload[]
    ) {}
}
