import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CoachSharedModule } from 'app/shared';
import {
    ContactPhoneComponent,
    ContactPhoneDetailComponent,
    ContactPhoneUpdateComponent,
    ContactPhoneDeletePopupComponent,
    ContactPhoneDeleteDialogComponent,
    contactPhoneRoute,
    contactPhonePopupRoute
} from './';

const ENTITY_STATES = [...contactPhoneRoute, ...contactPhonePopupRoute];

@NgModule({
    imports: [CoachSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ContactPhoneComponent,
        ContactPhoneDetailComponent,
        ContactPhoneUpdateComponent,
        ContactPhoneDeleteDialogComponent,
        ContactPhoneDeletePopupComponent
    ],
    entryComponents: [
        ContactPhoneComponent,
        ContactPhoneUpdateComponent,
        ContactPhoneDeleteDialogComponent,
        ContactPhoneDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoachContactPhoneModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
