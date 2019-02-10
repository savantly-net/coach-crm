import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CoachSharedModule } from 'app/shared';
import {
    UploadComponent,
    UploadDetailComponent,
    UploadUpdateComponent,
    UploadDeletePopupComponent,
    UploadDeleteDialogComponent,
    uploadRoute,
    uploadPopupRoute
} from './';

const ENTITY_STATES = [...uploadRoute, ...uploadPopupRoute];

@NgModule({
    imports: [CoachSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [UploadComponent, UploadDetailComponent, UploadUpdateComponent, UploadDeleteDialogComponent, UploadDeletePopupComponent],
    entryComponents: [UploadComponent, UploadUpdateComponent, UploadDeleteDialogComponent, UploadDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoachUploadModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
