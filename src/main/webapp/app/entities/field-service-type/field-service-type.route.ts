import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FieldServiceType } from 'app/shared/model/field-service-type.model';
import { FieldServiceTypeService } from './field-service-type.service';
import { FieldServiceTypeComponent } from './field-service-type.component';
import { FieldServiceTypeDetailComponent } from './field-service-type-detail.component';
import { FieldServiceTypeUpdateComponent } from './field-service-type-update.component';
import { FieldServiceTypeDeletePopupComponent } from './field-service-type-delete-dialog.component';
import { IFieldServiceType } from 'app/shared/model/field-service-type.model';

@Injectable({ providedIn: 'root' })
export class FieldServiceTypeResolve implements Resolve<IFieldServiceType> {
    constructor(private service: FieldServiceTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFieldServiceType> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FieldServiceType>) => response.ok),
                map((fieldServiceType: HttpResponse<FieldServiceType>) => fieldServiceType.body)
            );
        }
        return of(new FieldServiceType());
    }
}

export const fieldServiceTypeRoute: Routes = [
    {
        path: '',
        component: FieldServiceTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.fieldServiceType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FieldServiceTypeDetailComponent,
        resolve: {
            fieldServiceType: FieldServiceTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.fieldServiceType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FieldServiceTypeUpdateComponent,
        resolve: {
            fieldServiceType: FieldServiceTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.fieldServiceType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FieldServiceTypeUpdateComponent,
        resolve: {
            fieldServiceType: FieldServiceTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.fieldServiceType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fieldServiceTypePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: FieldServiceTypeDeletePopupComponent,
        resolve: {
            fieldServiceType: FieldServiceTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.fieldServiceType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
