import { Routes } from '@angular/router';
import { TodoContainerComponent } from './ui/components/todo-container/todo-container.component';
import { provideTodoListState } from './state/provider/provide-todo-list-state';

export const routes: Routes = [
    {
        path: 'todos',
        title: 'BD Todo',
        component: TodoContainerComponent,
        providers: [provideTodoListState()],
    },
    { path: '', redirectTo: '/todos', pathMatch: 'full' },
];
