import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContactPhone } from 'app/shared/model/contact-phone.model';
import { ContactPhoneService } from './contact-phone.service';

@Component({
    selector: 'jhi-contact-phone-delete-dialog',
    templateUrl: './contact-phone-delete-dialog.component.html'
})
export class ContactPhoneDeleteDialogComponent {
    contactPhone: IContactPhone;

    constructor(
        protected contactPhoneService: ContactPhoneService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contactPhoneService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'contactPhoneListModification',
                content: 'Deleted an contactPhone'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contact-phone-delete-popup',
    template: ''
})
export class ContactPhoneDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contactPhone }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ContactPhoneDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.contactPhone = contactPhone;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/contact-phone', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/contact-phone', { outlets: { popup: null } }]);
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
