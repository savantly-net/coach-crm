/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CoachTestModule } from '../../../test.module';
import { ContactEmailDeleteDialogComponent } from 'app/entities/contact-email/contact-email-delete-dialog.component';
import { ContactEmailService } from 'app/entities/contact-email/contact-email.service';

describe('Component Tests', () => {
    describe('ContactEmail Management Delete Component', () => {
        let comp: ContactEmailDeleteDialogComponent;
        let fixture: ComponentFixture<ContactEmailDeleteDialogComponent>;
        let service: ContactEmailService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoachTestModule],
                declarations: [ContactEmailDeleteDialogComponent]
            })
                .overrideTemplate(ContactEmailDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContactEmailDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactEmailService);
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
