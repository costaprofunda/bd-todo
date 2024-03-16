import { of } from 'rxjs';
import { TodoItem } from '../api/models/todo-item.model';
import { mockTodoApiResponse } from './todo-api.mock';

export class MockTodoFacade {
    get selectTodoList$() {
        return of(mockTodoApiResponse);
    }

    get selectTodoMessages$() {
        return of({ error: 'Error occurred', info: 'Api response succeeded' });
    }

    fetchList(): void {}
    fetchItem(id: string): void {}
    createItem(item: TodoItem): void {}
    updateItem(item: TodoItem): void {}
    removeItem(id: string): void {}
}
