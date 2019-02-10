/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoachTestModule } from '../../../test.module';
import { FieldServiceRequestDetailComponent } from 'app/entities/field-service-request/field-service-request-detail.component';
import { FieldServiceRequest } from 'app/shared/model/field-service-request.model';

describe('Component Tests', () => {
    describe('FieldServiceRequest Management Detail Component', () => {
        let comp: FieldServiceRequestDetailComponent;
        let fixture: ComponentFixture<FieldServiceRequestDetailComponent>;
        const route = ({ data: of({ fieldServiceRequest: new FieldServiceRequest(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoachTestModule],
                declarations: [FieldServiceRequestDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FieldServiceRequestDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FieldServiceRequestDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fieldServiceRequest).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
