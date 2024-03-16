import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TodoItem } from '../../../api/models/todo-item.model';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'bd-todo-creation',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatCheckboxModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
    ],
    templateUrl: './todo-creation.component.html',
    styleUrl: './todo-creation.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCreationComponent {
    todoForm: FormGroup;

    @Output() addTodoItem = new EventEmitter<TodoItem>();

    constructor(private readonly formBuilder: FormBuilder) {
        this.todoForm = this.formBuilder.group({
            todoText: ['', Validators.required],
            userName: ['', Validators.required],
        });
    }

    submit(): void {
        this.addTodoItem.emit(this.todoForm.value);
        this.todoForm.reset();
    }
}
