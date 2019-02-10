import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IFieldServiceType } from 'app/shared/model/field-service-type.model';
import { FieldServiceTypeService } from './field-service-type.service';

@Component({
    selector: 'jhi-field-service-type-update',
    templateUrl: './field-service-type-update.component.html'
})
export class FieldServiceTypeUpdateComponent implements OnInit {
    fieldServiceType: IFieldServiceType;
    isSaving: boolean;

    constructor(protected fieldServiceTypeService: FieldServiceTypeService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fieldServiceType }) => {
            this.fieldServiceType = fieldServiceType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.fieldServiceType.id !== undefined) {
            this.subscribeToSaveResponse(this.fieldServiceTypeService.update(this.fieldServiceType));
        } else {
            this.subscribeToSaveResponse(this.fieldServiceTypeService.create(this.fieldServiceType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFieldServiceType>>) {
        result.subscribe((res: HttpResponse<IFieldServiceType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
