import 'jest-preset-angular/setup-jest';
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as TodoActions from '../+state/todo.actions';
import { TodoFacade } from './todo.facade';

describe('Todo Facade', () => {
    let facade: TodoFacade;
    let store: MockStore;
    let dispatch: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [provideMockStore({}), TodoFacade],
        });

        store = TestBed.inject(MockStore);
        facade = TestBed.inject(TodoFacade);
        dispatch = jest.spyOn(store, 'dispatch');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call get todo list action', () => {});
    it('should dispatch getTodoList action when fetchList is called', () => {
        facade.fetchList();
        expect(dispatch).toHaveBeenCalledWith(TodoActions.getTodoList());
    });

    it('should dispatch getTodoItemById action with correct id when fetchItem is called', () => {
        const itemId = '123';
        facade.fetchItem(itemId);
        expect(dispatch).toHaveBeenCalledWith(TodoActions.getTodoItemById({ params: { id: itemId } }));
    });

    it('should dispatch createTodoItem action with correct item when createItem is called', () => {
        const newItem = { todoText: 'New Todo', userName: 'Super User', checked: false };
        facade.createItem(newItem);
        expect(dispatch).toHaveBeenCalledWith(TodoActions.createTodoItem({ params: { item: newItem } }));
    });

    it('should dispatch updateTodoItemById action with correct item when updateItem is called', () => {
        const updatedItem = { id: '789', todoText: 'Updated Todo', userName: 'Super User', checked: true };
        facade.updateItem(updatedItem);
        expect(dispatch).toHaveBeenCalledWith(TodoActions.updateTodoItemById({ params: { item: updatedItem } }));
    });

    it('should dispatch removeTodoItemById action with correct id when removeItem is called', () => {
        const itemId = '123';
        facade.removeItem(itemId);
        expect(dispatch).toHaveBeenCalledWith(TodoActions.removeTodoItemById({ params: { id: itemId } }));
    });
});
