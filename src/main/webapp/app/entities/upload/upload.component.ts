import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IUpload } from 'app/shared/model/upload.model';
import { AccountService } from 'app/core';
import { UploadService } from './upload.service';

@Component({
    selector: 'jhi-upload',
    templateUrl: './upload.component.html'
})
export class UploadComponent implements OnInit, OnDestroy {
    uploads: IUpload[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected uploadService: UploadService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.uploadService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IUpload[]>) => res.ok),
                    map((res: HttpResponse<IUpload[]>) => res.body)
                )
                .subscribe((res: IUpload[]) => (this.uploads = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.uploadService
            .query()
            .pipe(
                filter((res: HttpResponse<IUpload[]>) => res.ok),
                map((res: HttpResponse<IUpload[]>) => res.body)
            )
            .subscribe(
                (res: IUpload[]) => {
                    this.uploads = res;
                    this.currentSearch = '';
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUploads();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUpload) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInUploads() {
        this.eventSubscriber = this.eventManager.subscribe('uploadListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
