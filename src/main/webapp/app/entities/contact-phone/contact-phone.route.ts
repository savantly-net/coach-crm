import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ContactPhone } from 'app/shared/model/contact-phone.model';
import { ContactPhoneService } from './contact-phone.service';
import { ContactPhoneComponent } from './contact-phone.component';
import { ContactPhoneDetailComponent } from './contact-phone-detail.component';
import { ContactPhoneUpdateComponent } from './contact-phone-update.component';
import { ContactPhoneDeletePopupComponent } from './contact-phone-delete-dialog.component';
import { IContactPhone } from 'app/shared/model/contact-phone.model';

@Injectable({ providedIn: 'root' })
export class ContactPhoneResolve implements Resolve<IContactPhone> {
    constructor(private service: ContactPhoneService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContactPhone> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ContactPhone>) => response.ok),
                map((contactPhone: HttpResponse<ContactPhone>) => contactPhone.body)
            );
        }
        return of(new ContactPhone());
    }
}

export const contactPhoneRoute: Routes = [
    {
        path: '',
        component: ContactPhoneComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.contactPhone.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ContactPhoneDetailComponent,
        resolve: {
            contactPhone: ContactPhoneResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.contactPhone.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ContactPhoneUpdateComponent,
        resolve: {
            contactPhone: ContactPhoneResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.contactPhone.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ContactPhoneUpdateComponent,
        resolve: {
            contactPhone: ContactPhoneResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.contactPhone.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contactPhonePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ContactPhoneDeletePopupComponent,
        resolve: {
            contactPhone: ContactPhoneResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.contactPhone.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
