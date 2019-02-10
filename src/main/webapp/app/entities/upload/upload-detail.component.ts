import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IUpload } from 'app/shared/model/upload.model';

@Component({
    selector: 'jhi-upload-detail',
    templateUrl: './upload-detail.component.html'
})
export class UploadDetailComponent implements OnInit {
    upload: IUpload;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ upload }) => {
            this.upload = upload;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
