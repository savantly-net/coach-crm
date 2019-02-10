/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoachTestModule } from '../../../test.module';
import { FieldServiceRequestComponent } from 'app/entities/field-service-request/field-service-request.component';
import { FieldServiceRequestService } from 'app/entities/field-service-request/field-service-request.service';
import { FieldServiceRequest } from 'app/shared/model/field-service-request.model';

describe('Component Tests', () => {
    describe('FieldServiceRequest Management Component', () => {
        let comp: FieldServiceRequestComponent;
        let fixture: ComponentFixture<FieldServiceRequestComponent>;
        let service: FieldServiceRequestService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoachTestModule],
                declarations: [FieldServiceRequestComponent],
                providers: []
            })
                .overrideTemplate(FieldServiceRequestComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FieldServiceRequestComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldServiceRequestService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FieldServiceRequest(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.fieldServiceRequests[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
