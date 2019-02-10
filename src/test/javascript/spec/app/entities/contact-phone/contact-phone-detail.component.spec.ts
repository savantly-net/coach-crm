/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoachTestModule } from '../../../test.module';
import { ContactPhoneDetailComponent } from 'app/entities/contact-phone/contact-phone-detail.component';
import { ContactPhone } from 'app/shared/model/contact-phone.model';

describe('Component Tests', () => {
    describe('ContactPhone Management Detail Component', () => {
        let comp: ContactPhoneDetailComponent;
        let fixture: ComponentFixture<ContactPhoneDetailComponent>;
        const route = ({ data: of({ contactPhone: new ContactPhone(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoachTestModule],
                declarations: [ContactPhoneDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ContactPhoneDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContactPhoneDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.contactPhone).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
