/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoachTestModule } from '../../../test.module';
import { ContactEmailComponent } from 'app/entities/contact-email/contact-email.component';
import { ContactEmailService } from 'app/entities/contact-email/contact-email.service';
import { ContactEmail } from 'app/shared/model/contact-email.model';

describe('Component Tests', () => {
    describe('ContactEmail Management Component', () => {
        let comp: ContactEmailComponent;
        let fixture: ComponentFixture<ContactEmailComponent>;
        let service: ContactEmailService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoachTestModule],
                declarations: [ContactEmailComponent],
                providers: []
            })
                .overrideTemplate(ContactEmailComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContactEmailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactEmailService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ContactEmail(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.contactEmails[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
