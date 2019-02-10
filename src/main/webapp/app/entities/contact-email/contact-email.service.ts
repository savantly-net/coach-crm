import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IContactEmail } from 'app/shared/model/contact-email.model';

type EntityResponseType = HttpResponse<IContactEmail>;
type EntityArrayResponseType = HttpResponse<IContactEmail[]>;

@Injectable({ providedIn: 'root' })
export class ContactEmailService {
    public resourceUrl = SERVER_API_URL + 'api/contact-emails';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/contact-emails';

    constructor(protected http: HttpClient) {}

    create(contactEmail: IContactEmail): Observable<EntityResponseType> {
        return this.http.post<IContactEmail>(this.resourceUrl, contactEmail, { observe: 'response' });
    }

    update(contactEmail: IContactEmail): Observable<EntityResponseType> {
        return this.http.put<IContactEmail>(this.resourceUrl, contactEmail, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IContactEmail>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IContactEmail[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IContactEmail[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
