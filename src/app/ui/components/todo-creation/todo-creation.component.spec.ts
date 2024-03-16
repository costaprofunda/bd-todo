import 'jest-preset-angular/setup-jest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCreationComponent } from './todo-creation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TodoCreationComponent', () => {
    let component: TodoCreationComponent;
    let fixture: ComponentFixture<TodoCreationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TodoCreationComponent,
                ReactiveFormsModule,
                MatCheckboxModule,
                MatInputModule,
                MatButtonModule,
                MatFormFieldModule,
                MatIconModule,
                BrowserAnimationsModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TodoCreationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
