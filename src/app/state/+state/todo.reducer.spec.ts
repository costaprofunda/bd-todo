import 'jest-preset-angular/setup-jest';
import { State, initialState, todoReducer } from './todo.reducer';
import { Action } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { mockTodoApiResponse } from '../../mocks/todo-api.mock';

const mockList = mockTodoApiResponse;

describe('Todo Reducer', () => {
    it('should return the previous state', () => {
        const action = {} as Action;
        const result = todoReducer(initialState, action);
        expect(result).toBe(initialState);
    });

    it('getTodoListSuccess should update the state', () => {
        const response = mockList;
        const expectedState: State = {
            ...initialState,
            items: response,
        };
        const currentState: State = { ...initialState };
        const action = TodoActions.getTodoListSuccess({
            todoList: response,
        });
        const state = todoReducer(currentState, action);
        expect(state).toEqual(expectedState);
    });

    it('updateTodoItemByIdSuccess should update the state', () => {
        const response = { ...mockList[0], checked: true };
        const currentState: State = { ...initialState, items: mockList };
        const expectedState: State = {
            ...initialState,
            items: [response, ...mockList.slice(1, mockList.length)],
            infoMessage: 'Todo item updated',
        };
        const action = TodoActions.updateTodoItemByIdSuccess({
            todoItem: { ...mockList[0], checked: true },
        });
        const state = todoReducer(currentState, action);
        expect(state).toEqual(expectedState);
    });

    it('should save the error on getTodoListFail', () => {
        const response = 'test';
        const expectedState: State = {
            ...initialState,
            errorMessage: response,
        };
        const currentState: State = { ...initialState };
        const action = TodoActions.getTodoListFail({
            error: response,
        });
        const state = todoReducer(currentState, action);
        expect(state).toEqual(expectedState);
    });

    it('should save the error on other failure actions', () => {
        let state = todoReducer(
            { ...initialState, items: mockList },
            TodoActions.getTodoItemByIdFail({
                error: 'test 1',
            }),
        );
        expect(state).toEqual({
            ...initialState,
            items: mockList,
            errorMessage: 'test 1',
        });

        state = todoReducer(
            { ...initialState, items: mockList, errorMessage: 'test 1' },
            TodoActions.updateTodoItemByIdFail({
                error: 'test 2',
            }),
        );
        expect(state).toEqual({
            ...initialState,
            items: mockList,
            errorMessage: 'test 2',
        });

        state = todoReducer(
            { ...initialState, items: mockList, errorMessage: 'test 2' },
            TodoActions.updateTodoItemByIdFail({
                error: 'test 3',
            }),
        );
        expect(state).toEqual({
            ...initialState,
            items: mockList,
            errorMessage: 'test 3',
        });

        state = todoReducer(
            { ...initialState, items: mockList, errorMessage: 'test 3' },
            TodoActions.createTodoItemFail({
                error: 'test 4',
            }),
        );
        expect(state).toEqual({
            ...initialState,
            items: mockList,
            errorMessage: 'test 4',
        });
    });
});
