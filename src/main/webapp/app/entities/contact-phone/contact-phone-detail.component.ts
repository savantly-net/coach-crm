import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContactPhone } from 'app/shared/model/contact-phone.model';

@Component({
    selector: 'jhi-contact-phone-detail',
    templateUrl: './contact-phone-detail.component.html'
})
export class ContactPhoneDetailComponent implements OnInit {
    contactPhone: IContactPhone;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contactPhone }) => {
            this.contactPhone = contactPhone;
        });
    }

    previousState() {
        window.history.back();
    }
}
