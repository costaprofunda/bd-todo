import 'jest-preset-angular/setup-jest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoContainerComponent } from './todo-container.component';
import { TodoFacade } from '../../../state/service/todo.facade';
import { MockTodoFacade } from '../../../mocks/todo.facade.mock';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoCreationComponent } from '../todo-creation/todo-creation.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe.skip('TodoContainerComponent', () => {
    let component: TodoContainerComponent;
    let fixture: ComponentFixture<TodoContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TodoContainerComponent, CommonModule, MatSnackBarModule],
            providers: [{ provide: TodoFacade, useClass: MockTodoFacade }],
        })
            .overrideComponent(TodoContainerComponent, {
                remove: {
                    imports: [TodoListComponent, TodoCreationComponent],
                },
                add: {
                    schemas: [CUSTOM_ELEMENTS_SCHEMA],
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
