import { TodoItem } from '../../api/models/todo-item.model';

export interface TodoState {
    items: TodoItem[];
    errorMessage: string;
    infoMessage: string;
}
