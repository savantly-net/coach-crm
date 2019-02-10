import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IUpload } from 'app/shared/model/upload.model';
import { UploadService } from './upload.service';
import { IFieldServiceRequest } from 'app/shared/model/field-service-request.model';
import { FieldServiceRequestService } from 'app/entities/field-service-request';

@Component({
    selector: 'jhi-upload-update',
    templateUrl: './upload-update.component.html'
})
export class UploadUpdateComponent implements OnInit {
    upload: IUpload;
    isSaving: boolean;

    fieldservicerequests: IFieldServiceRequest[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected uploadService: UploadService,
        protected fieldServiceRequestService: FieldServiceRequestService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ upload }) => {
            this.upload = upload;
        });
        this.fieldServiceRequestService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IFieldServiceRequest[]>) => mayBeOk.ok),
                map((response: HttpResponse<IFieldServiceRequest[]>) => response.body)
            )
            .subscribe(
                (res: IFieldServiceRequest[]) => (this.fieldservicerequests = res),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.upload.id !== undefined) {
            this.subscribeToSaveResponse(this.uploadService.update(this.upload));
        } else {
            this.subscribeToSaveResponse(this.uploadService.create(this.upload));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUpload>>) {
        result.subscribe((res: HttpResponse<IUpload>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFieldServiceRequestById(index: number, item: IFieldServiceRequest) {
        return item.id;
    }
}
