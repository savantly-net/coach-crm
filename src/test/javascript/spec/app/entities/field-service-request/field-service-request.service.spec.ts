/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { FieldServiceRequestService } from 'app/entities/field-service-request/field-service-request.service';
import { IFieldServiceRequest, FieldServiceRequest, FieldServiceStatus } from 'app/shared/model/field-service-request.model';

describe('Service Tests', () => {
    describe('FieldServiceRequest Service', () => {
        let injector: TestBed;
        let service: FieldServiceRequestService;
        let httpMock: HttpTestingController;
        let elemDefault: IFieldServiceRequest;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(FieldServiceRequestService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new FieldServiceRequest(
                0,
                FieldServiceStatus.PROPOSAL,
                currentDate,
                currentDate,
                currentDate,
                'AAAAAAA',
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA'
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        contractDate: currentDate.format(DATE_FORMAT),
                        startDate: currentDate.format(DATE_FORMAT),
                        finishDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a FieldServiceRequest', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        contractDate: currentDate.format(DATE_FORMAT),
                        startDate: currentDate.format(DATE_FORMAT),
                        finishDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        contractDate: currentDate,
                        startDate: currentDate,
                        finishDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new FieldServiceRequest(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a FieldServiceRequest', async () => {
                const returnedFromService = Object.assign(
                    {
                        status: 'BBBBBB',
                        contractDate: currentDate.format(DATE_FORMAT),
                        startDate: currentDate.format(DATE_FORMAT),
                        finishDate: currentDate.format(DATE_FORMAT),
                        description: 'BBBBBB',
                        total: 1,
                        street: 'BBBBBB',
                        city: 'BBBBBB',
                        state: 'BBBBBB',
                        zipcode: 'BBBBBB',
                        country: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        contractDate: currentDate,
                        startDate: currentDate,
                        finishDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of FieldServiceRequest', async () => {
                const returnedFromService = Object.assign(
                    {
                        status: 'BBBBBB',
                        contractDate: currentDate.format(DATE_FORMAT),
                        startDate: currentDate.format(DATE_FORMAT),
                        finishDate: currentDate.format(DATE_FORMAT),
                        description: 'BBBBBB',
                        total: 1,
                        street: 'BBBBBB',
                        city: 'BBBBBB',
                        state: 'BBBBBB',
                        zipcode: 'BBBBBB',
                        country: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        contractDate: currentDate,
                        startDate: currentDate,
                        finishDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a FieldServiceRequest', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
