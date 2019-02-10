/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CoachTestModule } from '../../../test.module';
import { FieldServiceRequestUpdateComponent } from 'app/entities/field-service-request/field-service-request-update.component';
import { FieldServiceRequestService } from 'app/entities/field-service-request/field-service-request.service';
import { FieldServiceRequest } from 'app/shared/model/field-service-request.model';

describe('Component Tests', () => {
    describe('FieldServiceRequest Management Update Component', () => {
        let comp: FieldServiceRequestUpdateComponent;
        let fixture: ComponentFixture<FieldServiceRequestUpdateComponent>;
        let service: FieldServiceRequestService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoachTestModule],
                declarations: [FieldServiceRequestUpdateComponent]
            })
                .overrideTemplate(FieldServiceRequestUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FieldServiceRequestUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldServiceRequestService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FieldServiceRequest(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fieldServiceRequest = entity;
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
                    const entity = new FieldServiceRequest();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fieldServiceRequest = entity;
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
