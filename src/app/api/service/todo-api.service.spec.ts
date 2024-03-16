import 'jest-preset-angular/setup-jest';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TodoApiService } from './todo-api.service';
import { take } from 'rxjs';
import { mockTodoApiResponse } from '../../mocks/todo-api.mock';

describe('TodoApiService', () => {
    let service: TodoApiService;
    let httpMock: HttpTestingController;

    const mockApiResponse = mockTodoApiResponse;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(TodoApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch the list of todo items', done => {
        const mockRes = [...mockApiResponse];

        service
            .getList()
            .pipe(take(1))
            .subscribe(res => {
                expect(res).toEqual(mockRes);
                done();
            });

        const req = httpMock.expectOne(service.baseUrl);
        expect(req.request.method).toEqual('GET');
        req.flush(mockRes);
    });

    it('should fetch the todo item by id', done => {
        const id = '9';
        const mockRes = { ...mockApiResponse[0] };

        service
            .getItem(id)
            .pipe(take(1))
            .subscribe(res => {
                expect(res).toEqual(mockRes);
                done();
            });

        const req = httpMock.expectOne(`${service.baseUrl}/${id}`);
        expect(req.request.method).toEqual('GET');
        req.flush(mockRes);
    });

    it('should create todo item', done => {
        const item = { userName: 'userName', todoText: 'todoText', checked: false };
        const mockRes = { ...item, id: 'id' };

        service
            .createItem(item)
            .pipe(take(1))
            .subscribe(res => {
                expect(res).toEqual(mockRes);
                done();
            });

        const req = httpMock.expectOne(service.baseUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(mockRes);
    });

    it('should update the todo item', done => {
        const item = { ...mockApiResponse[0], checked: true };
        const mockRes = { ...item };

        service
            .updateItem(item)
            .pipe(take(1))
            .subscribe(res => {
                expect(res).toEqual(mockRes);
                done();
            });

        const req = httpMock.expectOne(`${service.baseUrl}/${mockApiResponse[0].id}`);
        expect(req.request.method).toEqual('PUT');
        req.flush(mockRes);
    });

    it('should not update the todo item if id is not specified', done => {
        const item = { ...mockApiResponse[0], id: '' };
        service
            .updateItem(item)
            .pipe(take(1))
            .subscribe({
                next: val => {
                    expect(!val.id).toBeTruthy();
                    done();
                },
                error: err => {
                    expect(err.message).toEqual('Id is not specified');
                    done();
                },
            });
    });

    it('should remove the todo item by id', done => {
        const id = '9';
        const mockRes = { ...mockApiResponse[0] };

        service
            .removeItem(id)
            .pipe(take(1))
            .subscribe(res => {
                expect(res).toBeUndefined;
                done();
            });

        const req = httpMock.expectOne(`${service.baseUrl}/${id}`);
        expect(req.request.method).toEqual('DELETE');
        req.flush(mockRes);
    });
});
