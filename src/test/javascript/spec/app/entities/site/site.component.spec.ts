/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoachTestModule } from '../../../test.module';
import { SiteComponent } from 'app/entities/site/site.component';
import { SiteService } from 'app/entities/site/site.service';
import { Site } from 'app/shared/model/site.model';

describe('Component Tests', () => {
    describe('Site Management Component', () => {
        let comp: SiteComponent;
        let fixture: ComponentFixture<SiteComponent>;
        let service: SiteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoachTestModule],
                declarations: [SiteComponent],
                providers: []
            })
                .overrideTemplate(SiteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SiteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SiteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Site(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sites[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
