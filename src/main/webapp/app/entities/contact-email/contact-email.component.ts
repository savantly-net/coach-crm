import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IContactEmail } from 'app/shared/model/contact-email.model';
import { AccountService } from 'app/core';
import { ContactEmailService } from './contact-email.service';

@Component({
    selector: 'jhi-contact-email',
    templateUrl: './contact-email.component.html'
})
export class ContactEmailComponent implements OnInit, OnDestroy {
    contactEmails: IContactEmail[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected contactEmailService: ContactEmailService,
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
            this.contactEmailService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IContactEmail[]>) => res.ok),
                    map((res: HttpResponse<IContactEmail[]>) => res.body)
                )
                .subscribe((res: IContactEmail[]) => (this.contactEmails = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.contactEmailService
            .query()
            .pipe(
                filter((res: HttpResponse<IContactEmail[]>) => res.ok),
                map((res: HttpResponse<IContactEmail[]>) => res.body)
            )
            .subscribe(
                (res: IContactEmail[]) => {
                    this.contactEmails = res;
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
        this.registerChangeInContactEmails();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IContactEmail) {
        return item.id;
    }

    registerChangeInContactEmails() {
        this.eventSubscriber = this.eventManager.subscribe('contactEmailListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
