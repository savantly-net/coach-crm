/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CoachTestModule } from '../../../test.module';
import { ContactPhoneUpdateComponent } from 'app/entities/contact-phone/contact-phone-update.component';
import { ContactPhoneService } from 'app/entities/contact-phone/contact-phone.service';
import { ContactPhone } from 'app/shared/model/contact-phone.model';

describe('Component Tests', () => {
    describe('ContactPhone Management Update Component', () => {
        let comp: ContactPhoneUpdateComponent;
        let fixture: ComponentFixture<ContactPhoneUpdateComponent>;
        let service: ContactPhoneService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoachTestModule],
                declarations: [ContactPhoneUpdateComponent]
            })
                .overrideTemplate(ContactPhoneUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContactPhoneUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactPhoneService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ContactPhone(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.contactPhone = entity;
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
                    const entity = new ContactPhone();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.contactPhone = entity;
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
