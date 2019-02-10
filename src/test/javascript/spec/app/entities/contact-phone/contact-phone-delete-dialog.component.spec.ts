/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CoachTestModule } from '../../../test.module';
import { ContactPhoneDeleteDialogComponent } from 'app/entities/contact-phone/contact-phone-delete-dialog.component';
import { ContactPhoneService } from 'app/entities/contact-phone/contact-phone.service';

describe('Component Tests', () => {
    describe('ContactPhone Management Delete Component', () => {
        let comp: ContactPhoneDeleteDialogComponent;
        let fixture: ComponentFixture<ContactPhoneDeleteDialogComponent>;
        let service: ContactPhoneService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoachTestModule],
                declarations: [ContactPhoneDeleteDialogComponent]
            })
                .overrideTemplate(ContactPhoneDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContactPhoneDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactPhoneService);
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
