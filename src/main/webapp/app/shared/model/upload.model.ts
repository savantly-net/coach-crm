import { IFieldServiceRequest } from 'app/shared/model/field-service-request.model';

export interface IUpload {
    id?: number;
    name?: string;
    description?: string;
    fileContentType?: string;
    file?: any;
    fieldServiceRequest?: IFieldServiceRequest;
}

export class Upload implements IUpload {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public fileContentType?: string,
        public file?: any,
        public fieldServiceRequest?: IFieldServiceRequest
    ) {}
}
