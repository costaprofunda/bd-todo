import 'jest-preset-angular/setup-jest';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { TodoListComponent } from './todo-list.component';

describe.skip('TodoListComponent', () => {
    let component: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TodoListComponent],
        })
            .overrideComponent(TodoListComponent, {
                remove: {
                    imports: [TodoListItemComponent],
                },
                add: {
                    schemas: [CUSTOM_ELEMENTS_SCHEMA],
                },
            })
            .compileComponents();

        fixture = TestBed.createComponent(TodoListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
