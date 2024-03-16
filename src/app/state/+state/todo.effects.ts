import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoApiService } from '../../api/service/todo-api.service';
import * as TodoActions from './todo.actions';
import { catchError, of, switchMap } from 'rxjs';

@Injectable()
export class TodoEffects {
    getTodoList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.getTodoList),
            switchMap(() =>
                this.todoApiService.getList().pipe(
                    switchMap(todoList => of(TodoActions.getTodoListSuccess({ todoList }))),
                    catchError(error => of(TodoActions.getTodoListFail({ error: error?.message }))),
                ),
            ),
        ),
    );

    getTodoItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.getTodoItemById),
            switchMap(({ params }) =>
                this.todoApiService.getItem(params.id).pipe(
                    switchMap(todoItem => of(TodoActions.getTodoItemByIdSuccess({ todoItem }))),
                    catchError(error => of(TodoActions.getTodoItemByIdFail({ error: error?.message }))),
                ),
            ),
        ),
    );

    createTodoItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.createTodoItem),
            switchMap(({ params }) =>
                this.todoApiService.createItem(params.item).pipe(
                    switchMap(todoItem =>
                        of(TodoActions.createTodoItemSuccess({ todoItem }), TodoActions.getTodoList()),
                    ),
                    catchError(error => of(TodoActions.updateTodoItemByIdFail({ error: error?.message }))),
                ),
            ),
        ),
    );

    updateTodoItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.updateTodoItemById),
            switchMap(({ params }) =>
                this.todoApiService.updateItem(params.item).pipe(
                    switchMap(todoItem => of(TodoActions.updateTodoItemByIdSuccess({ todoItem }))),
                    catchError(error => of(TodoActions.updateTodoItemByIdFail({ error: error?.message }))),
                ),
            ),
        ),
    );

    removeTodoItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.removeTodoItemById),
            switchMap(({ params }) =>
                this.todoApiService.removeItem(params.id).pipe(
                    switchMap(() =>
                        of(TodoActions.removeTodoItemByIdSuccess({ id: params.id }), TodoActions.getTodoList()),
                    ),
                    catchError(error => of(TodoActions.removeTodoItemByIdFail({ error: error?.message }))),
                ),
            ),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly todoApiService: TodoApiService,
    ) {}
}
