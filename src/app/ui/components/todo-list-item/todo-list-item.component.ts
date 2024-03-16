import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../../../api/models/todo-item.model';
import { TodoContainerComponent } from '../todo-container/todo-container.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'bd-todo-list-item',
    standalone: true,
    imports: [
        FormsModule,
        MatCheckboxModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        TodoContainerComponent,
    ],
    templateUrl: './todo-list-item.component.html',
    styleUrl: './todo-list-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListItemComponent {
    todoItem!: TodoItem;
    textFocused = false;

    private _item!: TodoItem;

    @Input() set item(item: TodoItem) {
        this._item = item;
        this.todoItem = { ...item };
    }

    @Output() updateItem = new EventEmitter<TodoItem>();

    setChecked(checked: boolean): void {
        if (this.todoItem.todoText) {
            this.todoItem.checked = checked;
            this.updateItem.emit(this.todoItem);
        }
    }

    clearTodoText(): void {
        this.todoItem.todoText = '';
    }

    blurFromText(): void {
        if (this._item.todoText !== this.todoItem.todoText) {
            this.updateItem.emit(this.todoItem);
        }
        this.textFocused = false;
    }
}
