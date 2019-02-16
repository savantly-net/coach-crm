import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISite } from 'app/shared/model/site.model';
import { SiteService } from './site.service';
import { IContact } from 'app/shared/model/contact.model';
import { ContactService } from 'app/entities/contact';

@Component({
    selector: 'jhi-site-update',
    templateUrl: './site-update.component.html'
})
export class SiteUpdateComponent implements OnInit {
    site: ISite;
    isSaving: boolean;

    primarycontacts: IContact[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected siteService: SiteService,
        protected contactService: ContactService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ site }) => {
            this.site = site;
        });
        this.contactService
            .query({ filter: 'site-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IContact[]>) => mayBeOk.ok),
                map((response: HttpResponse<IContact[]>) => response.body)
            )
            .subscribe(
                (res: IContact[]) => {
                    if (!this.site.primaryContact || !this.site.primaryContact.id) {
                        this.primarycontacts = res;
                    } else {
                        this.contactService
                            .find(this.site.primaryContact.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IContact>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IContact>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IContact) => (this.primarycontacts = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.site.id !== undefined) {
            this.subscribeToSaveResponse(this.siteService.update(this.site));
        } else {
            this.subscribeToSaveResponse(this.siteService.create(this.site));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISite>>) {
        result.subscribe((res: HttpResponse<ISite>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackContactById(index: number, item: IContact) {
        return item.id;
    }
}
