import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { Observable, Subject, filter, pairwise, takeUntil } from 'rxjs';
import { TodoItem } from '../../../api/models/todo-item.model';
import { CommonModule } from '@angular/common';
import { TodoCreationComponent } from '../todo-creation/todo-creation.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TodoFacade } from '../../../state/service/todo.facade';
import { TodoMessages } from '../../../state/models/todo-messages.model';

@Component({
    selector: 'bd-todo-container',
    standalone: true,
    imports: [CommonModule, MatSnackBarModule, TodoListComponent, TodoCreationComponent],
    templateUrl: './todo-container.component.html',
    styleUrl: './todo-container.component.scss',
})
export class TodoContainerComponent implements OnInit, OnDestroy {
    private readonly todoFacade = inject(TodoFacade);
    private readonly snackBar = inject(MatSnackBar);

    todoList$: Observable<TodoItem[]> = this.todoFacade.selectTodoList$;
    todoMessages$: Observable<TodoMessages> = this.todoFacade.selectTodoMessages$;

    private readonly destroyed$ = new Subject<boolean>();

    ngOnInit(): void {
        this.todoFacade.fetchList();
        this.todoMessages$.pipe(pairwise(), takeUntil(this.destroyed$)).subscribe(([first, second]) => {
            if (!first.error && second.error) {
                this.snackBar.open(second.error, '', { duration: 9000 });
            }
            if (!first.info && second.info) {
                this.snackBar.open(second.info);
            }
        });
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    addItem(item: TodoItem): void {
        this.todoFacade.createItem(item);
    }

    updateOrRemoveItem(item: TodoItem): void {
        if (!item.todoText && item.id) {
            this.todoFacade.removeItem(item.id);
        } else {
            this.todoFacade.updateItem(item);
        }
    }
}
