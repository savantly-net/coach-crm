/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CoachTestModule } from '../../../test.module';
import { ContactEmailUpdateComponent } from 'app/entities/contact-email/contact-email-update.component';
import { ContactEmailService } from 'app/entities/contact-email/contact-email.service';
import { ContactEmail } from 'app/shared/model/contact-email.model';

describe('Component Tests', () => {
    describe('ContactEmail Management Update Component', () => {
        let comp: ContactEmailUpdateComponent;
        let fixture: ComponentFixture<ContactEmailUpdateComponent>;
        let service: ContactEmailService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoachTestModule],
                declarations: [ContactEmailUpdateComponent]
            })
                .overrideTemplate(ContactEmailUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContactEmailUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactEmailService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ContactEmail(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.contactEmail = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ContactEmail();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.contactEmail = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
