import { IFieldServiceRequest } from 'app/shared/model/field-service-request.model';

export interface IFieldServiceType {
    id?: number;
    name?: string;
    description?: string;
    fieldServiceRequests?: IFieldServiceRequest[];
}

export class FieldServiceType implements IFieldServiceType {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public fieldServiceRequests?: IFieldServiceRequest[]
    ) {}
}
