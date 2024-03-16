import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { TodoItem } from '../models/todo-item.model';

@Injectable({
    providedIn: 'root',
})
export class TodoApiService {
    baseUrl = 'https://6523c967ea560a22a4e8d725.mockapi.io/todos';

    private readonly httpClient = inject(HttpClient);

    getList(): Observable<TodoItem[]> {
        const url = this.baseUrl;
        return this.httpClient.get<TodoItem[]>(url);
    }

    getItem(id: string): Observable<TodoItem> {
        const url = `${this.baseUrl}/${id}`;
        return this.httpClient.get<TodoItem>(url);
    }

    createItem(item: TodoItem): Observable<TodoItem> {
        const url = this.baseUrl;
        return this.httpClient.post<TodoItem>(url, item);
    }

    updateItem(item: TodoItem): Observable<TodoItem> {
        if (!item.id) {
            return throwError(() => new Error('Id is not specified'));
        }
        const url = `${this.baseUrl}/${item.id}`;
        return this.httpClient.put<TodoItem>(url, item);
    }

    removeItem(id: string): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.httpClient.delete(url);
    }
}
