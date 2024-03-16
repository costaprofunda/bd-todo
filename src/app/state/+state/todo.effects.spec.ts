import 'jest-preset-angular/setup-jest';
import { provideMockActions } from '@ngrx/effects/testing';
import { TodoEffects } from './todo.effects';
import { Observable, of } from 'rxjs';
import { TodoApiService } from '../../api/service/todo-api.service';
import { TestBed } from '@angular/core/testing';
import { mockTodoApiResponse } from '../../mocks/todo-api.mock';
import * as TodoActions from './todo.actions';
import { TestScheduler } from 'rxjs/testing';

const mockTodoApiService = {
    getList: jest.fn(),
    getItem: jest.fn(),
    createItem: jest.fn(),
    updateItem: jest.fn(),
    removeItem: jest.fn(),
};
describe('Todo Effects', () => {
    let effects: TodoEffects;
    let actions: Observable<any>;
    let service: TodoApiService;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });

        TestBed.configureTestingModule({
            providers: [
                provideMockActions(() => actions),
                TodoEffects,
                { provide: TodoApiService, useValue: mockTodoApiService },
            ],
        });

        effects = TestBed.inject(TodoEffects);
        service = TestBed.inject(TodoApiService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch all todo items', () => {
        const mockApiResponse = [...mockTodoApiResponse];
        jest.spyOn(service, 'getList').mockReturnValue(of(mockApiResponse));

        testScheduler.run(helpers => {
            const { hot, expectObservable } = helpers;
            actions = hot('--a-', {
                a: TodoActions.getTodoList(),
            });

            expectObservable(effects.getTodoList$).toBe('--b', {
                b: TodoActions.getTodoListSuccess({ todoList: mockApiResponse }),
            });
        });
    });

    it('should fetch todo item by id', () => {
        const mockApiResponse = { ...mockTodoApiResponse[0] };
        jest.spyOn(service, 'getItem').mockReturnValue(of(mockApiResponse));

        testScheduler.run(helpers => {
            const { hot, expectObservable } = helpers;
            actions = hot('--a-', {
                a: TodoActions.getTodoItemById({ params: { id: '9' } }),
            });

            expectObservable(effects.getTodoItem$).toBe('--b', {
                b: TodoActions.getTodoItemByIdSuccess({ todoItem: mockApiResponse }),
            });
        });
    });

    it('should create todo item and fetch list', () => {
        const item = {
            userName: 'userName',
            todoText: 'todoText',
            checked: false,
        };
        const mockApiResponse = { ...item, id: 'id' };
        jest.spyOn(service, 'createItem').mockReturnValue(of(mockApiResponse));

        testScheduler.run(helpers => {
            const { hot, expectObservable } = helpers;
            actions = hot('--a-', {
                a: TodoActions.createTodoItem({ params: { item } }),
            });

            expectObservable(effects.createTodoItem$).toBe('--(bc)', {
                b: TodoActions.createTodoItemSuccess({ todoItem: mockApiResponse }),
                c: TodoActions.getTodoList(),
            });
        });
    });

    it('should update todo item', () => {
        const mockApiResponse = { ...mockTodoApiResponse[0], checked: true };
        jest.spyOn(service, 'updateItem').mockReturnValue(of(mockApiResponse));

        testScheduler.run(helpers => {
            const { hot, expectObservable } = helpers;
            actions = hot('--a-', {
                a: TodoActions.updateTodoItemById({ params: { item: mockApiResponse } }),
            });

            expectObservable(effects.updateTodoItem$).toBe('--b', {
                b: TodoActions.updateTodoItemByIdSuccess({ todoItem: mockApiResponse }),
            });
        });
    });

    it('should remove todo item and fetch list', () => {
        jest.spyOn(service, 'removeItem').mockReturnValue(of(''));

        testScheduler.run(helpers => {
            const { hot, expectObservable } = helpers;
            actions = hot('--a-', {
                a: TodoActions.removeTodoItemById({ params: { id: '9' } }),
            });

            expectObservable(effects.removeTodoItem$).toBe('--(bc)', {
                b: TodoActions.removeTodoItemByIdSuccess({ id: '9' }),
                c: TodoActions.getTodoList(),
            });
        });
    });
});
