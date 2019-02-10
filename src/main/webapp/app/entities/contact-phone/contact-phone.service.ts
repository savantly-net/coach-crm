import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IContactPhone } from 'app/shared/model/contact-phone.model';

type EntityResponseType = HttpResponse<IContactPhone>;
type EntityArrayResponseType = HttpResponse<IContactPhone[]>;

@Injectable({ providedIn: 'root' })
export class ContactPhoneService {
    public resourceUrl = SERVER_API_URL + 'api/contact-phones';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/contact-phones';

    constructor(protected http: HttpClient) {}

    create(contactPhone: IContactPhone): Observable<EntityResponseType> {
        return this.http.post<IContactPhone>(this.resourceUrl, contactPhone, { observe: 'response' });
    }

    update(contactPhone: IContactPhone): Observable<EntityResponseType> {
        return this.http.put<IContactPhone>(this.resourceUrl, contactPhone, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IContactPhone>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IContactPhone[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IContactPhone[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
