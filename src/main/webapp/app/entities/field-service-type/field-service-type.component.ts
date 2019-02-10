import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFieldServiceType } from 'app/shared/model/field-service-type.model';
import { AccountService } from 'app/core';
import { FieldServiceTypeService } from './field-service-type.service';

@Component({
    selector: 'jhi-field-service-type',
    templateUrl: './field-service-type.component.html'
})
export class FieldServiceTypeComponent implements OnInit, OnDestroy {
    fieldServiceTypes: IFieldServiceType[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected fieldServiceTypeService: FieldServiceTypeService,
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
            this.fieldServiceTypeService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IFieldServiceType[]>) => res.ok),
                    map((res: HttpResponse<IFieldServiceType[]>) => res.body)
                )
                .subscribe(
                    (res: IFieldServiceType[]) => (this.fieldServiceTypes = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.fieldServiceTypeService
            .query()
            .pipe(
                filter((res: HttpResponse<IFieldServiceType[]>) => res.ok),
                map((res: HttpResponse<IFieldServiceType[]>) => res.body)
            )
            .subscribe(
                (res: IFieldServiceType[]) => {
                    this.fieldServiceTypes = res;
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
        this.registerChangeInFieldServiceTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFieldServiceType) {
        return item.id;
    }

    registerChangeInFieldServiceTypes() {
        this.eventSubscriber = this.eventManager.subscribe('fieldServiceTypeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
