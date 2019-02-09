import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { CoachSharedLibsModule, CoachSharedCommonModule, HasAnyAuthorityDirective } from './';

@NgModule({
    imports: [CoachSharedLibsModule, CoachSharedCommonModule],
    declarations: [HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    exports: [CoachSharedCommonModule, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoachSharedModule {
    static forRoot() {
        return {
            ngModule: CoachSharedModule
        };
    }
}
