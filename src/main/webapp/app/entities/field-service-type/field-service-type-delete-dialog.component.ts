import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFieldServiceType } from 'app/shared/model/field-service-type.model';
import { FieldServiceTypeService } from './field-service-type.service';

@Component({
    selector: 'jhi-field-service-type-delete-dialog',
    templateUrl: './field-service-type-delete-dialog.component.html'
})
export class FieldServiceTypeDeleteDialogComponent {
    fieldServiceType: IFieldServiceType;

    constructor(
        protected fieldServiceTypeService: FieldServiceTypeService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fieldServiceTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'fieldServiceTypeListModification',
                content: 'Deleted an fieldServiceType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-field-service-type-delete-popup',
    template: ''
})
export class FieldServiceTypeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fieldServiceType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FieldServiceTypeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.fieldServiceType = fieldServiceType;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/field-service-type', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/field-service-type', { outlets: { popup: null } }]);
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
