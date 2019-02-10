import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FieldServiceRequest } from 'app/shared/model/field-service-request.model';
import { FieldServiceRequestService } from './field-service-request.service';
import { FieldServiceRequestComponent } from './field-service-request.component';
import { FieldServiceRequestDetailComponent } from './field-service-request-detail.component';
import { FieldServiceRequestUpdateComponent } from './field-service-request-update.component';
import { FieldServiceRequestDeletePopupComponent } from './field-service-request-delete-dialog.component';
import { IFieldServiceRequest } from 'app/shared/model/field-service-request.model';

@Injectable({ providedIn: 'root' })
export class FieldServiceRequestResolve implements Resolve<IFieldServiceRequest> {
    constructor(private service: FieldServiceRequestService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFieldServiceRequest> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FieldServiceRequest>) => response.ok),
                map((fieldServiceRequest: HttpResponse<FieldServiceRequest>) => fieldServiceRequest.body)
            );
        }
        return of(new FieldServiceRequest());
    }
}

export const fieldServiceRequestRoute: Routes = [
    {
        path: '',
        component: FieldServiceRequestComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.fieldServiceRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FieldServiceRequestDetailComponent,
        resolve: {
            fieldServiceRequest: FieldServiceRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.fieldServiceRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FieldServiceRequestUpdateComponent,
        resolve: {
            fieldServiceRequest: FieldServiceRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.fieldServiceRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FieldServiceRequestUpdateComponent,
        resolve: {
            fieldServiceRequest: FieldServiceRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.fieldServiceRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fieldServiceRequestPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: FieldServiceRequestDeletePopupComponent,
        resolve: {
            fieldServiceRequest: FieldServiceRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.fieldServiceRequest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
