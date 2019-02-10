import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IContactEmail } from 'app/shared/model/contact-email.model';
import { ContactEmailService } from './contact-email.service';
import { IContact } from 'app/shared/model/contact.model';
import { ContactService } from 'app/entities/contact';

@Component({
    selector: 'jhi-contact-email-update',
    templateUrl: './contact-email-update.component.html'
})
export class ContactEmailUpdateComponent implements OnInit {
    contactEmail: IContactEmail;
    isSaving: boolean;

    contacts: IContact[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected contactEmailService: ContactEmailService,
        protected contactService: ContactService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contactEmail }) => {
            this.contactEmail = contactEmail;
        });
        this.contactService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IContact[]>) => mayBeOk.ok),
                map((response: HttpResponse<IContact[]>) => response.body)
            )
            .subscribe((res: IContact[]) => (this.contacts = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.contactEmail.id !== undefined) {
            this.subscribeToSaveResponse(this.contactEmailService.update(this.contactEmail));
        } else {
            this.subscribeToSaveResponse(this.contactEmailService.create(this.contactEmail));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IContactEmail>>) {
        result.subscribe((res: HttpResponse<IContactEmail>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
