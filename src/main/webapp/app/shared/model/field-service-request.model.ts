import { Moment } from 'moment';
import { IContact } from 'app/shared/model/contact.model';
import { IUpload } from 'app/shared/model/upload.model';
import { IFieldServiceType } from 'app/shared/model/field-service-type.model';

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
    requestor?: IContact;
    documents?: IUpload[];
    fieldServiceType?: IFieldServiceType;
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
        public requestor?: IContact,
        public documents?: IUpload[],
        public fieldServiceType?: IFieldServiceType
    ) {}
}
