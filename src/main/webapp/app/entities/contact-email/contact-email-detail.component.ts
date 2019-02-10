import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContactEmail } from 'app/shared/model/contact-email.model';

@Component({
    selector: 'jhi-contact-email-detail',
    templateUrl: './contact-email-detail.component.html'
})
export class ContactEmailDetailComponent implements OnInit {
    contactEmail: IContactEmail;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contactEmail }) => {
            this.contactEmail = contactEmail;
        });
    }

    previousState() {
        window.history.back();
    }
}
