/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoachTestModule } from '../../../test.module';
import { ContactEmailDetailComponent } from 'app/entities/contact-email/contact-email-detail.component';
import { ContactEmail } from 'app/shared/model/contact-email.model';

describe('Component Tests', () => {
    describe('ContactEmail Management Detail Component', () => {
        let comp: ContactEmailDetailComponent;
        let fixture: ComponentFixture<ContactEmailDetailComponent>;
        const route = ({ data: of({ contactEmail: new ContactEmail(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoachTestModule],
                declarations: [ContactEmailDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ContactEmailDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContactEmailDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.contactEmail).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
