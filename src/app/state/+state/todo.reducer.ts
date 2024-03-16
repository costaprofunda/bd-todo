import { createReducer, on } from '@ngrx/store';
import { TodoState } from '../models/todo-state.model';
import * as TodoActions from './todo.actions';

export type State = TodoState;

export const initialState: State = {
    items: [],
    errorMessage: '',
    infoMessage: '',
};

export const todoReducer = createReducer(
    initialState,
    on(
        TodoActions.getTodoList,
        TodoActions.getTodoItemById,
        TodoActions.createTodoItem,
        TodoActions.updateTodoItemById,
        TodoActions.removeTodoItemById,
        state => ({ ...state, infoMessage: '', errorMessage: '' }),
    ),
    on(TodoActions.getTodoListSuccess, (state, { todoList }) => ({ ...state, items: todoList })),
    on(TodoActions.createTodoItemSuccess, state => ({ ...state, infoMessage: 'Todo item added' })),
    on(TodoActions.updateTodoItemByIdSuccess, (state, { todoItem }) => {
        const itemIndex = state.items.findIndex(item => item.id === todoItem.id);
        const items = [
            ...state.items.slice(0, itemIndex),
            todoItem,
            ...state.items.slice(itemIndex + 1, state.items.length),
        ];
        return { ...state, items, infoMessage: 'Todo item updated' };
    }),
    on(TodoActions.removeTodoItemByIdSuccess, state => ({
        ...state,
        errorMessage: '',
        infoMessage: 'Todo item removed',
    })),
    on(TodoActions.getTodoListFail, (state, { error }) => ({ ...initialState, errorMessage: error })),
    on(
        TodoActions.createTodoItemFail,
        TodoActions.getTodoItemByIdFail,
        TodoActions.updateTodoItemByIdFail,
        TodoActions.removeTodoItemByIdFail,
        (state, { error }) => ({ ...state, errorMessage: error }),
    ),
);
