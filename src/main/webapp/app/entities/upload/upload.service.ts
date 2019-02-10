import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUpload } from 'app/shared/model/upload.model';

type EntityResponseType = HttpResponse<IUpload>;
type EntityArrayResponseType = HttpResponse<IUpload[]>;

@Injectable({ providedIn: 'root' })
export class UploadService {
    public resourceUrl = SERVER_API_URL + 'api/uploads';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/uploads';

    constructor(protected http: HttpClient) {}

    create(upload: IUpload): Observable<EntityResponseType> {
        return this.http.post<IUpload>(this.resourceUrl, upload, { observe: 'response' });
    }

    update(upload: IUpload): Observable<EntityResponseType> {
        return this.http.put<IUpload>(this.resourceUrl, upload, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUpload>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUpload[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUpload[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
