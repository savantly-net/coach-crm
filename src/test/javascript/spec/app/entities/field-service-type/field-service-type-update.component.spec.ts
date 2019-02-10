/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CoachTestModule } from '../../../test.module';
import { FieldServiceTypeUpdateComponent } from 'app/entities/field-service-type/field-service-type-update.component';
import { FieldServiceTypeService } from 'app/entities/field-service-type/field-service-type.service';
import { FieldServiceType } from 'app/shared/model/field-service-type.model';

describe('Component Tests', () => {
    describe('FieldServiceType Management Update Component', () => {
        let comp: FieldServiceTypeUpdateComponent;
        let fixture: ComponentFixture<FieldServiceTypeUpdateComponent>;
        let service: FieldServiceTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoachTestModule],
                declarations: [FieldServiceTypeUpdateComponent]
            })
                .overrideTemplate(FieldServiceTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FieldServiceTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldServiceTypeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FieldServiceType(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fieldServiceType = entity;
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
                    const entity = new FieldServiceType();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fieldServiceType = entity;
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
