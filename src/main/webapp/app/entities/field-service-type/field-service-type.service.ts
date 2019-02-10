import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFieldServiceType } from 'app/shared/model/field-service-type.model';

type EntityResponseType = HttpResponse<IFieldServiceType>;
type EntityArrayResponseType = HttpResponse<IFieldServiceType[]>;

@Injectable({ providedIn: 'root' })
export class FieldServiceTypeService {
    public resourceUrl = SERVER_API_URL + 'api/field-service-types';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/field-service-types';

    constructor(protected http: HttpClient) {}

    create(fieldServiceType: IFieldServiceType): Observable<EntityResponseType> {
        return this.http.post<IFieldServiceType>(this.resourceUrl, fieldServiceType, { observe: 'response' });
    }

    update(fieldServiceType: IFieldServiceType): Observable<EntityResponseType> {
        return this.http.put<IFieldServiceType>(this.resourceUrl, fieldServiceType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFieldServiceType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFieldServiceType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFieldServiceType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
