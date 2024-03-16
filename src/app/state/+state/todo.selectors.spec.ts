import 'jest-preset-angular/setup-jest';
import * as TodoSelectors from './todo.selectors';
import { mockTodoApiResponse } from '../../mocks/todo-api.mock';

const state = {
    todoList: {
        items: mockTodoApiResponse,
        errorMessage: 'error',
        infoMessage: 'info',
    },
};
describe('Todo Selectors', () => {
    it('should return todo list', () => {
        const res = TodoSelectors.getTodoList(state);
        expect(res).toHaveLength(mockTodoApiResponse.length);
    });

    it('should return error message', () => {
        const res = TodoSelectors.getTodoErrorMessage(state);
        expect(res).toEqual('error');
    });

    it('should return info message', () => {
        const res = TodoSelectors.getTodoInfoMessage(state);
        expect(res).toEqual('info');
    });

    it('should return messages object', () => {
        const res = TodoSelectors.getTodoMessages(state);
        expect(res).toEqual({ error: 'error', info: 'info' });
    });
});
