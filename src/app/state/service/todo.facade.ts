import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as TodoActions from '../+state/todo.actions';
import * as TodoSelectors from '../+state/todo.selectors';
import { TodoItem } from '../../api/models/todo-item.model';

@Injectable({ providedIn: 'root' })
export class TodoFacade {
    private readonly store = inject(Store);

    selectTodoList$ = this.store.pipe(select(TodoSelectors.getTodoList));

    selectTodoMessages$ = this.store.pipe(select(TodoSelectors.getTodoMessages));

    fetchList(): void {
        this.store.dispatch(TodoActions.getTodoList());
    }

    fetchItem(id: string): void {
        this.store.dispatch(TodoActions.getTodoItemById({ params: { id } }));
    }

    createItem(item: TodoItem): void {
        this.store.dispatch(TodoActions.createTodoItem({ params: { item } }));
    }

    updateItem(item: TodoItem): void {
        this.store.dispatch(TodoActions.updateTodoItemById({ params: { item } }));
    }

    removeItem(id: string): void {
        this.store.dispatch(TodoActions.removeTodoItemById({ params: { id } }));
    }
}
