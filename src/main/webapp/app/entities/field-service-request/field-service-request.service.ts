import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFieldServiceRequest } from 'app/shared/model/field-service-request.model';

type EntityResponseType = HttpResponse<IFieldServiceRequest>;
type EntityArrayResponseType = HttpResponse<IFieldServiceRequest[]>;

@Injectable({ providedIn: 'root' })
export class FieldServiceRequestService {
    public resourceUrl = SERVER_API_URL + 'api/field-service-requests';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/field-service-requests';

    constructor(protected http: HttpClient) {}

    create(fieldServiceRequest: IFieldServiceRequest): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fieldServiceRequest);
        return this.http
            .post<IFieldServiceRequest>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(fieldServiceRequest: IFieldServiceRequest): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fieldServiceRequest);
        return this.http
            .put<IFieldServiceRequest>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFieldServiceRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFieldServiceRequest[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFieldServiceRequest[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(fieldServiceRequest: IFieldServiceRequest): IFieldServiceRequest {
        const copy: IFieldServiceRequest = Object.assign({}, fieldServiceRequest, {
            contractDate:
                fieldServiceRequest.contractDate != null && fieldServiceRequest.contractDate.isValid()
                    ? fieldServiceRequest.contractDate.format(DATE_FORMAT)
                    : null,
            startDate:
                fieldServiceRequest.startDate != null && fieldServiceRequest.startDate.isValid()
                    ? fieldServiceRequest.startDate.format(DATE_FORMAT)
                    : null,
            finishDate:
                fieldServiceRequest.finishDate != null && fieldServiceRequest.finishDate.isValid()
                    ? fieldServiceRequest.finishDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.contractDate = res.body.contractDate != null ? moment(res.body.contractDate) : null;
            res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
            res.body.finishDate = res.body.finishDate != null ? moment(res.body.finishDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((fieldServiceRequest: IFieldServiceRequest) => {
                fieldServiceRequest.contractDate =
                    fieldServiceRequest.contractDate != null ? moment(fieldServiceRequest.contractDate) : null;
                fieldServiceRequest.startDate = fieldServiceRequest.startDate != null ? moment(fieldServiceRequest.startDate) : null;
                fieldServiceRequest.finishDate = fieldServiceRequest.finishDate != null ? moment(fieldServiceRequest.finishDate) : null;
            });
        }
        return res;
    }
}
