import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IFieldServiceRequest } from 'app/shared/model/field-service-request.model';
import { FieldServiceRequestService } from './field-service-request.service';
import { IContact } from 'app/shared/model/contact.model';
import { ContactService } from 'app/entities/contact';
import { IFieldServiceType } from 'app/shared/model/field-service-type.model';
import { FieldServiceTypeService } from 'app/entities/field-service-type';

@Component({
    selector: 'jhi-field-service-request-update',
    templateUrl: './field-service-request-update.component.html'
})
export class FieldServiceRequestUpdateComponent implements OnInit {
    fieldServiceRequest: IFieldServiceRequest;
    isSaving: boolean;

    requestors: IContact[];

    fieldservicetypes: IFieldServiceType[];
    contractDateDp: any;
    startDateDp: any;
    finishDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected fieldServiceRequestService: FieldServiceRequestService,
        protected contactService: ContactService,
        protected fieldServiceTypeService: FieldServiceTypeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fieldServiceRequest }) => {
            this.fieldServiceRequest = fieldServiceRequest;
        });
        this.contactService
            .query({ filter: 'fieldservicerequest-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IContact[]>) => mayBeOk.ok),
                map((response: HttpResponse<IContact[]>) => response.body)
            )
            .subscribe(
                (res: IContact[]) => {
                    if (!this.fieldServiceRequest.requestor || !this.fieldServiceRequest.requestor.id) {
                        this.requestors = res;
                    } else {
                        this.contactService
                            .find(this.fieldServiceRequest.requestor.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IContact>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IContact>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IContact) => (this.requestors = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.fieldServiceTypeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IFieldServiceType[]>) => mayBeOk.ok),
                map((response: HttpResponse<IFieldServiceType[]>) => response.body)
            )
            .subscribe((res: IFieldServiceType[]) => (this.fieldservicetypes = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.fieldServiceRequest.id !== undefined) {
            this.subscribeToSaveResponse(this.fieldServiceRequestService.update(this.fieldServiceRequest));
        } else {
            this.subscribeToSaveResponse(this.fieldServiceRequestService.create(this.fieldServiceRequest));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFieldServiceRequest>>) {
        result.subscribe((res: HttpResponse<IFieldServiceRequest>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFieldServiceTypeById(index: number, item: IFieldServiceType) {
        return item.id;
    }
}
