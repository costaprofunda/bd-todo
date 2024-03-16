import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../../../api/models/todo-item.model';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';

@Component({
    selector: 'bd-todo-list',
    standalone: true,
    imports: [TodoListItemComponent],
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
    @Input() list!: TodoItem[] | null;

    @Output() updateListItem = new EventEmitter<TodoItem>();

    updateItem(item: TodoItem): void {
        this.updateListItem.emit(item);
    }
}
