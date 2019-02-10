import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CoachSharedModule } from 'app/shared';
import {
    FieldServiceTypeComponent,
    FieldServiceTypeDetailComponent,
    FieldServiceTypeUpdateComponent,
    FieldServiceTypeDeletePopupComponent,
    FieldServiceTypeDeleteDialogComponent,
    fieldServiceTypeRoute,
    fieldServiceTypePopupRoute
} from './';

const ENTITY_STATES = [...fieldServiceTypeRoute, ...fieldServiceTypePopupRoute];

@NgModule({
    imports: [CoachSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FieldServiceTypeComponent,
        FieldServiceTypeDetailComponent,
        FieldServiceTypeUpdateComponent,
        FieldServiceTypeDeleteDialogComponent,
        FieldServiceTypeDeletePopupComponent
    ],
    entryComponents: [
        FieldServiceTypeComponent,
        FieldServiceTypeUpdateComponent,
        FieldServiceTypeDeleteDialogComponent,
        FieldServiceTypeDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoachFieldServiceTypeModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
