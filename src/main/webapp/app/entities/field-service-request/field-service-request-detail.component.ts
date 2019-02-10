import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFieldServiceRequest } from 'app/shared/model/field-service-request.model';

@Component({
    selector: 'jhi-field-service-request-detail',
    templateUrl: './field-service-request-detail.component.html'
})
export class FieldServiceRequestDetailComponent implements OnInit {
    fieldServiceRequest: IFieldServiceRequest;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fieldServiceRequest }) => {
            this.fieldServiceRequest = fieldServiceRequest;
        });
    }

    previousState() {
        window.history.back();
    }
}
