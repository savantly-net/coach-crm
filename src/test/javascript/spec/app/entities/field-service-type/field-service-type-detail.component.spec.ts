/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoachTestModule } from '../../../test.module';
import { FieldServiceTypeDetailComponent } from 'app/entities/field-service-type/field-service-type-detail.component';
import { FieldServiceType } from 'app/shared/model/field-service-type.model';

describe('Component Tests', () => {
    describe('FieldServiceType Management Detail Component', () => {
        let comp: FieldServiceTypeDetailComponent;
        let fixture: ComponentFixture<FieldServiceTypeDetailComponent>;
        const route = ({ data: of({ fieldServiceType: new FieldServiceType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoachTestModule],
                declarations: [FieldServiceTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FieldServiceTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FieldServiceTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fieldServiceType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
