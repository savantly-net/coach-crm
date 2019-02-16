import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'site',
                loadChildren: './site/site.module#CoachSiteModule'
            },
            {
                path: 'contact',
                loadChildren: './contact/contact.module#CoachContactModule'
            },
            {
                path: 'upload',
                loadChildren: './upload/upload.module#CoachUploadModule'
            },
            {
                path: 'field-service-type',
                loadChildren: './field-service-type/field-service-type.module#CoachFieldServiceTypeModule'
            },
            {
                path: 'field-service-request',
                loadChildren: './field-service-request/field-service-request.module#CoachFieldServiceRequestModule'
            },
            {
                path: 'site',
                loadChildren: './site/site.module#CoachSiteModule'
            },
            {
                path: 'contact',
                loadChildren: './contact/contact.module#CoachContactModule'
            },
            {
                path: 'upload',
                loadChildren: './upload/upload.module#CoachUploadModule'
            },
            {
                path: 'field-service-type',
                loadChildren: './field-service-type/field-service-type.module#CoachFieldServiceTypeModule'
            },
            {
                path: 'field-service-request',
                loadChildren: './field-service-request/field-service-request.module#CoachFieldServiceRequestModule'
            },
            {
                path: 'site',
                loadChildren: './site/site.module#CoachSiteModule'
            },
            {
                path: 'contact',
                loadChildren: './contact/contact.module#CoachContactModule'
            },
            {
                path: 'upload',
                loadChildren: './upload/upload.module#CoachUploadModule'
            },
            {
                path: 'field-service-type',
                loadChildren: './field-service-type/field-service-type.module#CoachFieldServiceTypeModule'
            },
            {
                path: 'field-service-request',
                loadChildren: './field-service-request/field-service-request.module#CoachFieldServiceRequestModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoachEntityModule {}
