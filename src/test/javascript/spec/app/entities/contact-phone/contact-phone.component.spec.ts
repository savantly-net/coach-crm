/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoachTestModule } from '../../../test.module';
import { ContactPhoneComponent } from 'app/entities/contact-phone/contact-phone.component';
import { ContactPhoneService } from 'app/entities/contact-phone/contact-phone.service';
import { ContactPhone } from 'app/shared/model/contact-phone.model';

describe('Component Tests', () => {
    describe('ContactPhone Management Component', () => {
        let comp: ContactPhoneComponent;
        let fixture: ComponentFixture<ContactPhoneComponent>;
        let service: ContactPhoneService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoachTestModule],
                declarations: [ContactPhoneComponent],
                providers: []
            })
                .overrideTemplate(ContactPhoneComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContactPhoneComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactPhoneService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ContactPhone(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.contactPhones[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
