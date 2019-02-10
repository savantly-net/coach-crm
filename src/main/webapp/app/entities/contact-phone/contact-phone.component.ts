import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IContactPhone } from 'app/shared/model/contact-phone.model';
import { AccountService } from 'app/core';
import { ContactPhoneService } from './contact-phone.service';

@Component({
    selector: 'jhi-contact-phone',
    templateUrl: './contact-phone.component.html'
})
export class ContactPhoneComponent implements OnInit, OnDestroy {
    contactPhones: IContactPhone[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected contactPhoneService: ContactPhoneService,
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
            this.contactPhoneService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IContactPhone[]>) => res.ok),
                    map((res: HttpResponse<IContactPhone[]>) => res.body)
                )
                .subscribe((res: IContactPhone[]) => (this.contactPhones = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.contactPhoneService
            .query()
            .pipe(
                filter((res: HttpResponse<IContactPhone[]>) => res.ok),
                map((res: HttpResponse<IContactPhone[]>) => res.body)
            )
            .subscribe(
                (res: IContactPhone[]) => {
                    this.contactPhones = res;
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
        this.registerChangeInContactPhones();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IContactPhone) {
        return item.id;
    }

    registerChangeInContactPhones() {
        this.eventSubscriber = this.eventManager.subscribe('contactPhoneListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
