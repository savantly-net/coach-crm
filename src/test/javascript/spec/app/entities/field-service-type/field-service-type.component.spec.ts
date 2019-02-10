/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoachTestModule } from '../../../test.module';
import { FieldServiceTypeComponent } from 'app/entities/field-service-type/field-service-type.component';
import { FieldServiceTypeService } from 'app/entities/field-service-type/field-service-type.service';
import { FieldServiceType } from 'app/shared/model/field-service-type.model';

describe('Component Tests', () => {
    describe('FieldServiceType Management Component', () => {
        let comp: FieldServiceTypeComponent;
        let fixture: ComponentFixture<FieldServiceTypeComponent>;
        let service: FieldServiceTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoachTestModule],
                declarations: [FieldServiceTypeComponent],
                providers: []
            })
                .overrideTemplate(FieldServiceTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FieldServiceTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldServiceTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FieldServiceType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.fieldServiceTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
