import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFieldServiceType } from 'app/shared/model/field-service-type.model';

@Component({
    selector: 'jhi-field-service-type-detail',
    templateUrl: './field-service-type-detail.component.html'
})
export class FieldServiceTypeDetailComponent implements OnInit {
    fieldServiceType: IFieldServiceType;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fieldServiceType }) => {
            this.fieldServiceType = fieldServiceType;
        });
    }

    previousState() {
        window.history.back();
    }
}
