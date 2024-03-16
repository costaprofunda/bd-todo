import { createAction, props } from '@ngrx/store';
import { TodoItem } from '../../api/models/todo-item.model';

export const getTodoList = createAction('[Todo] Get List');
export const getTodoListSuccess = createAction('[Todo] Get List Success', props<{ todoList: TodoItem[] }>());
export const getTodoListFail = createAction('[Todo] Get List Fail', props<{ error: string }>());

export const getTodoItemById = createAction('[Todo] Get Item By Id', props<{ params: { id: string } }>());
export const getTodoItemByIdSuccess = createAction('[Todo] Get Item By Id Success', props<{ todoItem: TodoItem }>());
export const getTodoItemByIdFail = createAction('[Todo] Get Item By Id Fail', props<{ error: string }>());

export const createTodoItem = createAction('[Todo] Create Item', props<{ params: { item: TodoItem } }>());
export const createTodoItemSuccess = createAction('[Todo] Create Item Success', props<{ todoItem: TodoItem }>());
export const createTodoItemFail = createAction('[Todo] Create Item Fail', props<{ error: string }>());

export const updateTodoItemById = createAction('[Todo] Update Item By Id', props<{ params: { item: TodoItem } }>());
export const updateTodoItemByIdSuccess = createAction(
    '[Todo] Update Item By Id Success',
    props<{ todoItem: TodoItem }>(),
);
export const updateTodoItemByIdFail = createAction('[Todo] Update Item By Id Fail', props<{ error: string }>());

export const removeTodoItemById = createAction('[Todo] Remove Item By Id', props<{ params: { id: string } }>());
export const removeTodoItemByIdSuccess = createAction('[Todo] Remove Item By Id Success', props<{ id: string }>());
export const removeTodoItemByIdFail = createAction('[Todo] Remove Item By Id Fail', props<{ error: string }>());
