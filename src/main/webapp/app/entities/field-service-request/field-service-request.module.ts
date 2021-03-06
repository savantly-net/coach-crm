import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CoachSharedModule } from 'app/shared';
import {
    FieldServiceRequestComponent,
    FieldServiceRequestDetailComponent,
    FieldServiceRequestUpdateComponent,
    FieldServiceRequestDeletePopupComponent,
    FieldServiceRequestDeleteDialogComponent,
    fieldServiceRequestRoute,
    fieldServiceRequestPopupRoute
} from './';

const ENTITY_STATES = [...fieldServiceRequestRoute, ...fieldServiceRequestPopupRoute];

@NgModule({
    imports: [CoachSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FieldServiceRequestComponent,
        FieldServiceRequestDetailComponent,
        FieldServiceRequestUpdateComponent,
        FieldServiceRequestDeleteDialogComponent,
        FieldServiceRequestDeletePopupComponent
    ],
    entryComponents: [
        FieldServiceRequestComponent,
        FieldServiceRequestUpdateComponent,
        FieldServiceRequestDeleteDialogComponent,
        FieldServiceRequestDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoachFieldServiceRequestModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
