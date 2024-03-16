import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './todo.reducer';

export const getTodoState = createFeatureSelector<State>('todoList');

export const getTodoList = createSelector(getTodoState, (state: State) => state?.items ?? []);

export const getTodoErrorMessage = createSelector(getTodoState, (state: State) => state?.errorMessage);

export const getTodoInfoMessage = createSelector(getTodoState, (state: State) => state?.infoMessage);

export const getTodoMessages = createSelector(getTodoState, (state: State) => ({
    error: state?.errorMessage,
    info: state?.infoMessage,
}));
