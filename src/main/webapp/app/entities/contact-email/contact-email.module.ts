import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CoachSharedModule } from 'app/shared';
import {
    ContactEmailComponent,
    ContactEmailDetailComponent,
    ContactEmailUpdateComponent,
    ContactEmailDeletePopupComponent,
    ContactEmailDeleteDialogComponent,
    contactEmailRoute,
    contactEmailPopupRoute
} from './';

const ENTITY_STATES = [...contactEmailRoute, ...contactEmailPopupRoute];

@NgModule({
    imports: [CoachSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ContactEmailComponent,
        ContactEmailDetailComponent,
        ContactEmailUpdateComponent,
        ContactEmailDeleteDialogComponent,
        ContactEmailDeletePopupComponent
    ],
    entryComponents: [
        ContactEmailComponent,
        ContactEmailUpdateComponent,
        ContactEmailDeleteDialogComponent,
        ContactEmailDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoachContactEmailModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
