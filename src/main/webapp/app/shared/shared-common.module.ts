import { NgModule } from '@angular/core';

import { CoachSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [CoachSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent],
    exports: [CoachSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent]
})
export class CoachSharedCommonModule {}
