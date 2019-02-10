/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CoachTestModule } from '../../../test.module';
import { FieldServiceRequestDeleteDialogComponent } from 'app/entities/field-service-request/field-service-request-delete-dialog.component';
import { FieldServiceRequestService } from 'app/entities/field-service-request/field-service-request.service';

describe('Component Tests', () => {
    describe('FieldServiceRequest Management Delete Component', () => {
        let comp: FieldServiceRequestDeleteDialogComponent;
        let fixture: ComponentFixture<FieldServiceRequestDeleteDialogComponent>;
        let service: FieldServiceRequestService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoachTestModule],
                declarations: [FieldServiceRequestDeleteDialogComponent]
            })
                .overrideTemplate(FieldServiceRequestDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FieldServiceRequestDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldServiceRequestService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
