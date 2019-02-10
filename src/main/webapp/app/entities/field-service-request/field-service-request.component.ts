import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFieldServiceRequest } from 'app/shared/model/field-service-request.model';
import { AccountService } from 'app/core';
import { FieldServiceRequestService } from './field-service-request.service';

@Component({
    selector: 'jhi-field-service-request',
    templateUrl: './field-service-request.component.html'
})
export class FieldServiceRequestComponent implements OnInit, OnDestroy {
    fieldServiceRequests: IFieldServiceRequest[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected fieldServiceRequestService: FieldServiceRequestService,
        protected jhiAlertService: JhiAlertService,
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
            this.fieldServiceRequestService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IFieldServiceRequest[]>) => res.ok),
                    map((res: HttpResponse<IFieldServiceRequest[]>) => res.body)
                )
                .subscribe(
                    (res: IFieldServiceRequest[]) => (this.fieldServiceRequests = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.fieldServiceRequestService
            .query()
            .pipe(
                filter((res: HttpResponse<IFieldServiceRequest[]>) => res.ok),
                map((res: HttpResponse<IFieldServiceRequest[]>) => res.body)
            )
            .subscribe(
                (res: IFieldServiceRequest[]) => {
                    this.fieldServiceRequests = res;
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
        this.registerChangeInFieldServiceRequests();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFieldServiceRequest) {
        return item.id;
    }

    registerChangeInFieldServiceRequests() {
        this.eventSubscriber = this.eventManager.subscribe('fieldServiceRequestListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
