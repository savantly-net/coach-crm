import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ContactEmail } from 'app/shared/model/contact-email.model';
import { ContactEmailService } from './contact-email.service';
import { ContactEmailComponent } from './contact-email.component';
import { ContactEmailDetailComponent } from './contact-email-detail.component';
import { ContactEmailUpdateComponent } from './contact-email-update.component';
import { ContactEmailDeletePopupComponent } from './contact-email-delete-dialog.component';
import { IContactEmail } from 'app/shared/model/contact-email.model';

@Injectable({ providedIn: 'root' })
export class ContactEmailResolve implements Resolve<IContactEmail> {
    constructor(private service: ContactEmailService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContactEmail> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ContactEmail>) => response.ok),
                map((contactEmail: HttpResponse<ContactEmail>) => contactEmail.body)
            );
        }
        return of(new ContactEmail());
    }
}

export const contactEmailRoute: Routes = [
    {
        path: '',
        component: ContactEmailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.contactEmail.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ContactEmailDetailComponent,
        resolve: {
            contactEmail: ContactEmailResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.contactEmail.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ContactEmailUpdateComponent,
        resolve: {
            contactEmail: ContactEmailResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.contactEmail.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ContactEmailUpdateComponent,
        resolve: {
            contactEmail: ContactEmailResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.contactEmail.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contactEmailPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ContactEmailDeletePopupComponent,
        resolve: {
            contactEmail: ContactEmailResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'coachApp.contactEmail.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
