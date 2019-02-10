import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContactEmail } from 'app/shared/model/contact-email.model';
import { ContactEmailService } from './contact-email.service';

@Component({
    selector: 'jhi-contact-email-delete-dialog',
    templateUrl: './contact-email-delete-dialog.component.html'
})
export class ContactEmailDeleteDialogComponent {
    contactEmail: IContactEmail;

    constructor(
        protected contactEmailService: ContactEmailService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contactEmailService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'contactEmailListModification',
                content: 'Deleted an contactEmail'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contact-email-delete-popup',
    template: ''
})
export class ContactEmailDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contactEmail }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ContactEmailDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.contactEmail = contactEmail;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/contact-email', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/contact-email', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
