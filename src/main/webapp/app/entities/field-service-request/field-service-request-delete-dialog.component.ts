import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFieldServiceRequest } from 'app/shared/model/field-service-request.model';
import { FieldServiceRequestService } from './field-service-request.service';

@Component({
    selector: 'jhi-field-service-request-delete-dialog',
    templateUrl: './field-service-request-delete-dialog.component.html'
})
export class FieldServiceRequestDeleteDialogComponent {
    fieldServiceRequest: IFieldServiceRequest;

    constructor(
        protected fieldServiceRequestService: FieldServiceRequestService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fieldServiceRequestService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'fieldServiceRequestListModification',
                content: 'Deleted an fieldServiceRequest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-field-service-request-delete-popup',
    template: ''
})
export class FieldServiceRequestDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fieldServiceRequest }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FieldServiceRequestDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.fieldServiceRequest = fieldServiceRequest;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/field-service-request', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/field-service-request', { outlets: { popup: null } }]);
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
