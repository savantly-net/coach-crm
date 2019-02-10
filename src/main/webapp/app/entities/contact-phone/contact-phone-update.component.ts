import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IContactPhone } from 'app/shared/model/contact-phone.model';
import { ContactPhoneService } from './contact-phone.service';
import { IContact } from 'app/shared/model/contact.model';
import { ContactService } from 'app/entities/contact';

@Component({
    selector: 'jhi-contact-phone-update',
    templateUrl: './contact-phone-update.component.html'
})
export class ContactPhoneUpdateComponent implements OnInit {
    contactPhone: IContactPhone;
    isSaving: boolean;

    contacts: IContact[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected contactPhoneService: ContactPhoneService,
        protected contactService: ContactService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contactPhone }) => {
            this.contactPhone = contactPhone;
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
        if (this.contactPhone.id !== undefined) {
            this.subscribeToSaveResponse(this.contactPhoneService.update(this.contactPhone));
        } else {
            this.subscribeToSaveResponse(this.contactPhoneService.create(this.contactPhone));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IContactPhone>>) {
        result.subscribe((res: HttpResponse<IContactPhone>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
